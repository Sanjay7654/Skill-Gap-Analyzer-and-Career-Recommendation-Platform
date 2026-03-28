import supabase from '../config/supabaseClient.js';
import { calculateCareerRiskIndex, getRiskLabel } from '../services/riskEngine.js';
import { calculateStabilityIndex } from '../services/stabilityEngine.js';

/**
 * GET /api/risk/:userId/:roleId
 * Calculates and returns Career Risk Index (CRI) for a user vs a specific role.
 */
export const getCareerRisk = async (req, res) => {
    const { userId, roleId } = req.params;

    try {
        // 1. Fetch user skills
        const { data: userSkills, error: skillsError } = await supabase
            .from('user_skills')
            .select('*')
            .eq('user_id', userId);

        if (skillsError) throw skillsError;

        if (!userSkills || userSkills.length === 0) {
            return res.status(404).json({ success: false, message: 'No skills found for user' });
        }

        // 2. Fetch role required skills
        const { data: roleSkills, error: roleError } = await supabase
            .from('role_skills')
            .select('skill_name, required_level, weight')
            .eq('role_id', roleId);

        if (roleError) throw roleError;

        // 3. Compute skill gap percentage
        let totalGapPercent = 0;
        roleSkills.forEach(rs => {
            const us = userSkills.find(u => u.skill_name === rs.skill_name);
            const actual = us ? (us.validated_score || us.self_rating || 0) : 0;
            const gap = Math.max(0, rs.required_level - actual);
            totalGapPercent += (gap / rs.required_level) * 100;
        });
        const avgGapPercentage = roleSkills.length > 0
            ? totalGapPercent / roleSkills.length
            : 0;

        // 4. Compute skill stability
        const validatedScores = userSkills.map(s => s.validated_score || s.self_rating || 0);
        const stabilityScore = calculateStabilityIndex(validatedScores);
        const instabilityScore = 100 - stabilityScore;

        // 5. Compute confidence mismatch
        const confidenceGaps = userSkills
            .filter(s => s.self_rating !== null && s.quiz_score !== null)
            .map(s => Math.abs(s.self_rating - s.quiz_score));
        const avgConfidenceGap = confidenceGaps.length > 0
            ? (confidenceGaps.reduce((a, b) => a + b, 0) / confidenceGaps.length)
            : 0;
        const confidenceMismatch = (avgConfidenceGap / 5) * 100;

        // 6. Calculate Career Risk Index
        const riskIndex = calculateCareerRiskIndex(avgGapPercentage, instabilityScore, confidenceMismatch);
        const riskLabel = getRiskLabel(riskIndex);

        // 7. Persist to DB
        await supabase.from('career_risk_scores').upsert([{
            user_id: userId,
            role_id: roleId,
            skill_gap_score: Math.round(avgGapPercentage * 100) / 100,
            instability_score: Math.round(instabilityScore * 100) / 100,
            confidence_mismatch: Math.round(confidenceMismatch * 100) / 100,
            career_risk_index: riskIndex
        }]);

        return res.status(200).json({
            success: true,
            data: {
                riskIndex,
                riskLabel,
                breakdown: {
                    skillGapScore: Math.round(avgGapPercentage * 100) / 100,
                    instabilityScore: Math.round(instabilityScore * 100) / 100,
                    confidenceMismatch: Math.round(confidenceMismatch * 100) / 100
                },
                formula: 'CRI = (0.5 × SkillGap) + (0.3 × Instability) + (0.2 × ConfidenceMismatch)'
            }
        });

    } catch (err) {
        console.error('Career Risk Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * GET /api/risk/:userId
 * Returns saved career risk scores for all roles for a user.
 */
export const getAllRiskScores = async (req, res) => {
    const { userId } = req.params;

    try {
        const { data, error } = await supabase
            .from('career_risk_scores')
            .select('*, career_roles(career_name, domain)')
            .eq('user_id', userId)
            .order('career_risk_index', { ascending: true });

        if (error) throw error;

        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error('Get Risk Scores Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};
