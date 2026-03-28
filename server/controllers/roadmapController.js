import supabase from '../config/supabaseClient.js';

/**
 * GET /api/roadmap/role/:roleId
 * Returns the ordered learning roadmap for a specific career role.
 */
export const getRoadmapByRole = async (req, res) => {
    const { roleId } = req.params;

    try {
        // 1. Fetch role info
        const { data: role, error: roleError } = await supabase
            .from('career_roles')
            .select('career_name, description, domain')
            .eq('id', roleId)
            .single();

        if (roleError) throw roleError;

        // 2. Fetch roadmap steps in order
        const { data: steps, error: stepsError } = await supabase
            .from('learning_roadmaps')
            .select('step_number, skill_name, description')
            .eq('role_id', roleId)
            .order('step_number', { ascending: true });

        if (stepsError) throw stepsError;

        // 3. For each step, fetch learning resources for the skill
        const stepsWithResources = await Promise.all(steps.map(async (step) => {
            const { data: resources } = await supabase
                .from('learning_resources')
                .select('title, link, difficulty, resource_type')
                .eq('skill_name', step.skill_name)
                .limit(2);

            return {
                ...step,
                resources: resources || []
            };
        }));

        return res.status(200).json({
            success: true,
            data: {
                role,
                totalSteps: steps.length,
                roadmap: stepsWithResources
            }
        });

    } catch (err) {
        console.error('Roadmap Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * GET /api/roadmap/user/:userId
 * Returns the roadmap for the user's best matching career role.
 * It reads from career_scores to find their top role, then returns that role's roadmap.
 */
export const getRoadmapForUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // 1. Get user's top career score
        const { data: topScore, error: scoreError } = await supabase
            .from('career_scores')
            .select('role_id, final_suitability_score, career_roles(career_name, domain)')
            .eq('user_id', userId)
            .order('final_suitability_score', { ascending: false })
            .limit(1)
            .single();

        if (scoreError) throw scoreError;
        if (!topScore) {
            return res.status(404).json({ success: false, message: 'No career score found. Please complete skill assessment first.' });
        }

        const roleId = topScore.role_id;

        // 2. Fetch roadmap steps
        const { data: steps, error: stepsError } = await supabase
            .from('learning_roadmaps')
            .select('step_number, skill_name, description')
            .eq('role_id', roleId)
            .order('step_number', { ascending: true });

        if (stepsError) throw stepsError;

        // 3. Fetch user's current skill levels to mark completed steps
        const { data: userSkills } = await supabase
            .from('user_skills')
            .select('skill_name, validated_score, self_rating')
            .eq('user_id', userId);

        const userSkillMap = {};
        (userSkills || []).forEach(s => {
            userSkillMap[s.skill_name] = s.validated_score || s.self_rating || 0;
        });

        // 4. Fetch resources for each step
        const stepsWithStatus = await Promise.all(steps.map(async (step) => {
            const { data: resources } = await supabase
                .from('learning_resources')
                .select('title, link, difficulty, resource_type')
                .eq('skill_name', step.skill_name)
                .limit(2);

            const userLevel = userSkillMap[step.skill_name] || 0;
            const status = userLevel >= 3 ? 'completed' : userLevel > 0 ? 'in-progress' : 'not-started';

            return {
                ...step,
                userLevel,
                status,
                resources: resources || []
            };
        }));

        return res.status(200).json({
            success: true,
            data: {
                roleName: topScore.career_roles.career_name,
                domain: topScore.career_roles.domain,
                suitabilityScore: topScore.final_suitability_score,
                totalSteps: stepsWithStatus.length,
                completedSteps: stepsWithStatus.filter(s => s.status === 'completed').length,
                roadmap: stepsWithStatus
            }
        });

    } catch (err) {
        console.error('User Roadmap Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * GET /api/roadmap/all-roles
 * Returns the list of all roles (for the user to pick a roadmap to view).
 */
export const getAllRoles = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('career_roles')
            .select('id, career_name, domain, description');

        if (error) throw error;

        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error('All Roles Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};
