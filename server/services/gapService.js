import supabase from '../config/supabaseClient.js';

export const calculateTopRolesForUser = async (userId) => {

  const { data: roles, error: roleError } = await supabase
    .from('career_roles')
    .select('*');

  if (roleError) throw roleError;

  const { data: userSkills, error: userError } = await supabase
    .from('user_skills')
    .select('*')
    .eq('user_id', userId);

  if (userError) throw userError;

  const results = [];

  for (const role of roles) {
    const { data: roleSkills, error: skillError } = await supabase
      .from('role_skills')
      .select('*')
      .eq('role_id', role.id);

    if (skillError) throw skillError;

    let totalRequiredScore = 0;
    let totalUserScore = 0;

    for (const skill of roleSkills) {
      const userSkill = userSkills.find(u => u.skill_name === skill.skill_name);
      const userLevel = userSkill ? userSkill.level : 0;

      totalRequiredScore += skill.weight * skill.required_level;
      totalUserScore += skill.weight * userLevel;
    }

    let gapPercentage = ((totalRequiredScore - totalUserScore) / totalRequiredScore) * 100;
    gapPercentage = Math.max(0, gapPercentage.toFixed(2));


    let matchStrength = '';
    if (gapPercentage <= 30) matchStrength = 'Strong';
    else if (gapPercentage <= 60) matchStrength = 'Moderate';
    else matchStrength = 'Weak';

    results.push({
      roleId: role.id,
      roleTitle: role.title,
      gapPercentage: parseFloat(gapPercentage),
      matchStrength
    });
  }


  const filteredResults = results.filter(r => r.gapPercentage < 100);

  filteredResults.sort((a, b) => a.gapPercentage - b.gapPercentage);


  return filteredResults.slice(0, 3);
};
