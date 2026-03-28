import supabase from '../config/supabaseClient.js';
import { calculateVariance, calculateStabilityIndex } from '../services/stabilityEngine.js';

/**
 * GET /api/stability/:userId
 * Calculates skill stability score for the user (SSAM) and persists it.
 *
 * Formula:
 *   σ² = Σ(Xi − μ)² / N
 *   stability_score = 100 − (σ² × 10), clamped to [0, 100]
 */
export const getSkillStability = async (req, res) => {
    const { userId } = req.params;

    try {
        // 1. Fetch user skills
        const { data: userSkills, error } = await supabase
            .from('user_skills')
            .select('skill_name, self_rating, quiz_score, validated_score')
            .eq('user_id', userId);

        if (error) throw error;

        if (!userSkills || userSkills.length === 0) {
            return res.status(404).json({ success: false, message: 'No skills found for user' });
        }

        // 2. Build score vector (prefer validated_score, fallback to self_rating)
        const scoreVector = userSkills.map(s => s.validated_score || s.self_rating || 0);

        // 3. Calculate statistics
        const mean = scoreVector.reduce((a, b) => a + b, 0) / scoreVector.length;
        const variance = calculateVariance(scoreVector);
        const stdDeviation = Math.sqrt(variance);
        const stabilityScore = calculateStabilityIndex(scoreVector);

        // 4. Build per-skill breakdown
        const skillBreakdown = userSkills.map((s, i) => ({
            skill_name: s.skill_name,
            score: scoreVector[i],
            deviation: Math.abs(scoreVector[i] - mean)
        }));

        // 5. Determine stability label
        const label = stabilityScore >= 80 ? 'Highly Stable'
            : stabilityScore >= 60 ? 'Moderately Stable'
                : stabilityScore >= 40 ? 'Unstable'
                    : 'Critically Unstable';

        // 6. Persist to skill_stability table
        await supabase.from('skill_stability').upsert([{
            user_id: userId,
            mean_skill_score: Math.round(mean * 100) / 100,
            standard_deviation: Math.round(stdDeviation * 100) / 100,
            stability_score: stabilityScore
        }]);

        return res.status(200).json({
            success: true,
            data: {
                meanScore: Math.round(mean * 100) / 100,
                variance: Math.round(variance * 100) / 100,
                standardDeviation: Math.round(stdDeviation * 100) / 100,
                stabilityScore,
                stabilityLabel: label,
                skillCount: userSkills.length,
                skillBreakdown,
                formula: 'stability = 100 − (variance × 10), σ² = Σ(Xi − μ)² / N'
            }
        });

    } catch (err) {
        console.error('Skill Stability Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * GET /api/stability/history/:userId
 * Returns past stability scores for the user (to show trend over time).
 */
export const getStabilityHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const { data, error } = await supabase
            .from('skill_stability')
            .select('mean_skill_score, standard_deviation, stability_score, created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: true });

        if (error) throw error;

        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error('Stability History Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};
