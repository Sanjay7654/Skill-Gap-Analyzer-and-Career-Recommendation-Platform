import supabase from '../config/supabaseClient.js';
import { getResourcesForSkills } from '../services/resourceMapper.js';
import { generateRoadmap } from '../services/priorityEngine.js';

export const getSkillGapDetails = async (req, res, next) => {
  try {
    const { userId, roleId } = req.params;

    // 1. Fetch persistent career scores for this role
    //    Order by id DESC (avoid using calculated_at which may not exist)
    const { data: scoreData, error: scoreError } = await supabase
      .from('career_scores')
      .select('*')
      .eq('user_id', userId)
      .eq('role_id', roleId)
      .order('id', { ascending: false })
      .limit(1)
      .single();

    if (scoreError) throw scoreError;

    // 2. Fetch detailed gap scores
    const { data: gapDetails, error: gapError } = await supabase
      .from('gap_scores')
      .select('*')
      .eq('user_id', userId)
      .eq('role_id', roleId);

    if (gapError) throw gapError;

    // 3. Resources & Roadmap
    const missingSkillNames = gapDetails
      .filter(d => d.gap_value > 0)
      .map(d => d.skill_name);
    const resources = await getResourcesForSkills(missingSkillNames);

    const roadmapDetails = gapDetails
      .filter(d => d.gap_value > 0)
      .map(d => ({
        skill_name: d.skill_name,
        gap: d.gap_percentage,
        weight: d.gap_value > 0 ? d.priority_score / d.gap_value : 0
      }));
    const roadmap = await generateRoadmap(roadmapDetails);

    res.status(200).json({
      success: true,
      data: {
        suitabilityScore: scoreData.final_suitability_score,
        averageGap: 100 - scoreData.skill_match_score,
        gapDetails: gapDetails.map(d => ({
          skill: d.skill_name,
          required: d.required_skill,
          actual: d.user_skill,
          gapPercent: d.gap_percentage
        })),
        resources,
        roadmap,
        stabilityScore: scoreData.stability_score,
        confidenceScore: scoreData.confidence_score,
        riskIndex: scoreData.career_risk
      }
    });

  } catch (error) {
    console.error('Skill Gap Details Error:', error);
    res.status(500).json({ error: error.message });
  }
};
