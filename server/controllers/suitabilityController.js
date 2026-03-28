import supabase from "../config/supabaseClient.js";
import { calculateSuitability } from "../services/skillgapEngine.js";
import { calculateStabilityIndex } from "../services/stabilityEngine.js";
import { calculateCareerRiskIndex } from "../services/riskEngine.js";
import { getGapDetails } from "../services/skillGapService.js";

export const getTopCareers = async (req, res) => {
    const { userId } = req.params;

    try {
        // 0. Cleanup old results to prevent duplication
        await supabase.from("gap_scores").delete().eq("user_id", userId);
        await supabase.from("career_scores").delete().eq("user_id", userId);
        await supabase.from("skill_stability").delete().eq("user_id", userId);

        // 1. Fetch User Skills
        const { data: userSkills, error: skillsError } = await supabase
            .from("user_skills")
            .select("*")
            .eq("user_id", userId);

        if (skillsError) throw skillsError;

        if (!userSkills || userSkills.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // 2. Fetch All Roles with their skills
        const { data: roles, error: rolesError } = await supabase
            .from("career_roles")
            .select("*, role_skills(*)");

        if (rolesError) throw rolesError;

        // 3. Calculate Stability (SSAM)
        const validatedScores = userSkills.map(s => s.validated_score || s.self_rating || 0);
        const stabilityScore = calculateStabilityIndex(validatedScores);

        // 4. Persistence - Skill Stability
        await supabase.from("skill_stability").insert([{
            user_id: userId,
            mean_skill_score: validatedScores.reduce((a, b) => a + b, 0) / validatedScores.length,
            stability_score: stabilityScore
        }]);

        const results = await Promise.all(roles.map(async (role) => {
            const gapDetails = getGapDetails(role.role_skills, userSkills);

            // 5. Confidence Calculation (CCVM)
            // Calculated by comparing self_rating vs quiz_score
            let totalConfidence = 0;
            let ratedSkillsCount = 0;

            userSkills.forEach(s => {
                if (s.self_rating > 0 && s.quiz_score !== null) {
                    // Confidence = 100 - (abs(self - quiz) / 5 * 100)
                    const mismatch = Math.abs(s.self_rating - s.quiz_score);
                    const confidence = 100 - ((mismatch / 5) * 100);
                    totalConfidence += confidence;
                    ratedSkillsCount++;
                }
            });

            const confidenceScore = ratedSkillsCount > 0
                ? Math.round(totalConfidence / ratedSkillsCount)
                : 85; // Fallback

            // 6. Risk Calculation (CREM)
            const riskIndex = calculateCareerRiskIndex(gapDetails.gapPercentage, 100 - stabilityScore, 10);

            // 7. Dynamic Learning Adaptability (LAS)
            // Higher for users with more skills and higher mean score (representing learning potential)
            const learningAdaptability = Math.min(100, Math.round((stabilityScore * 0.4) + (confidenceScore * 0.4) + (Math.min(userSkills.length, 10) * 2)));

            // 8. SkillGap Final Score
            const suitabilityScore = calculateSuitability({
                skillGapPercentage: gapDetails.gapPercentage,
                stabilityScore,
                confidenceScore,
                learningAdaptability,
                riskIndex
            });

            // 8. Persistence - Career Scores
            await supabase.from("career_scores").insert([{
                user_id: userId,
                role_id: role.id,
                skill_match_score: 100 - gapDetails.gapPercentage,
                stability_score: stabilityScore,
                confidence_score: confidenceScore,
                career_risk: riskIndex,
                final_suitability_score: suitabilityScore
            }]);

            // 9. Persistence - Gap Scores
            if (gapDetails.details && gapDetails.details.length > 0) {
                const gapEntries = gapDetails.details.map(d => ({
                    user_id: userId,
                    role_id: role.id,
                    skill_name: d.skill,
                    required_skill: Math.round(d.required),
                    user_skill: Math.round(d.actual),
                    gap_value: Math.round(d.gap),
                    gap_percentage: d.gapPercent,
                    priority_score: d.priority
                }));
                await supabase.from("gap_scores").insert(gapEntries);
            }

            return {
                roleId: role.id,
                roleTitle: role.career_name,
                suitabilityScore,
                gapPercentage: gapDetails.gapPercentage,
                riskIndex,
                stabilityScore,
                matchStrength: suitabilityScore > 80 ? 'Strong' : suitabilityScore > 60 ? 'Moderate' : 'Low'
            };
        }));

        const allRolesSorted = results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);

        res.json({ success: true, data: allRolesSorted });

    } catch (err) {
        console.error("SkillGap Analyzer Engine Error:", err);
        res.status(500).json({ error: err.message });
    }
};
