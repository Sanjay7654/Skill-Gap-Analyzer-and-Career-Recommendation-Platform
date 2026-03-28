import supabase from '../config/supabaseClient.js';

export const logProgress = async (req, res) => {
  try {
    const { userId, skillName, previousLevel, newLevel } = req.body;

    await supabase.from('progress_logs').insert([{
      user_id: userId,
      skill_name: skillName,
      previous_level: previousLevel,
      new_level: newLevel,
      updated_at: new Date()
    }]);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSkillProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: userSkills, error } = await supabase
      .from('user_skills')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const formattedSkills = {};
    if (userSkills) {
      userSkills.forEach(skill => {
        formattedSkills[skill.skill_name] = skill.validated_score || skill.self_rating || 0;
      });
    }

    res.status(200).json({ success: true, data: formattedSkills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEvolutionData = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data: skills, error } = await supabase
      .from('user_skills')
      .select('skill_name, validated_score, self_rating')
      .eq('user_id', userId);

    if (error) throw error;

    const formatted = skills.reduce((acc, curr) => ({
      ...acc,
      [curr.skill_name]: curr.validated_score || curr.self_rating || 0
    }), {});

    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
