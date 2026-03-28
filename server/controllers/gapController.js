import supabase from '../config/supabaseClient.js';
import { getGapDetails } from '../services/skillGapService.js';

export const getTopRoles = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { data: userSkills } = await supabase
      .from('user_skills')
      .select('*')
      .eq('user_id', userId);

    const { data: roles } = await supabase
      .from('career_roles')
      .select('*, role_skills(*)');

    let results = [];
    for (let role of roles) {
      const gapData = getGapDetails(role.role_skills, userSkills || []);
      results.push({
        roleId: role.id,
        roleName: role.career_name,
        matchStrength: Math.round(100 - gapData.gapPercentage)
      });
    }
    results.sort((a, b) => b.matchStrength - a.matchStrength);
    res.json(results.slice(0, 3));
  } catch (error) {
    next(error);
  }
};

export const saveAssessment = async (req, res, next) => {
  try {
    const { userId, skills } = req.body;
    if (!userId || !skills) {
      return res.status(400).json({ success: false, message: "Missing userId or skills" });
    }
    await supabase.from('user_skills').delete().eq('user_id', userId);
    const { error } = await supabase.from('user_skills').insert(skills);
    if (error) throw error;
    res.status(200).json({ success: true, message: "Assessment saved successfully" });
  } catch (error) {
    console.error("Save Assessment Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/gap/resources?skill=HTML
 * Returns all learning_resources, optionally filtered by skill name.
 */
export const getResources = async (req, res) => {
  try {
    const { skill } = req.query;
    let query = supabase
      .from('learning_resources')
      .select('skill_name, title, link, difficulty, resource_type')
      .order('skill_name', { ascending: true });
    if (skill) query = query.eq('skill_name', skill);
    const { data, error } = await query;
    if (error) throw error;
    res.status(200).json({ success: true, data: data || [] });
  } catch (err) {
    console.error('Get Resources Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
/**
 * GET /api/gap/detailed/:userId/:roleTitle
 * Returns detailed skill gaps for a specific role.
 */
export const getDetailedGaps = async (req, res) => {
  try {
    const { userId, roleTitle } = req.params;

    const { data: role, error: roleError } = await supabase
      .from('career_roles')
      .select('*, role_skills(*)')
      .eq('career_name', roleTitle)
      .single();

    if (roleError) throw roleError;
    if (!role) return res.status(404).json({ success: false, message: "Role not found" });

    const { data: userSkills } = await supabase
      .from('user_skills')
      .select('*')
      .eq('user_id', userId);

    const gapData = getGapDetails(role.role_skills, userSkills || []);

    res.status(200).json({ success: true, data: gapData.details });
  } catch (err) {
    console.error('Get Detailed Gaps Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
