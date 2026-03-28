export const getGapDetails = (roleSkills, userSkills) => {
  let totalGapPercent = 0;
  let details = [];

  roleSkills.forEach(roleSkill => {
    const userSkill = userSkills.find(s => s.skill_name.toLowerCase() === roleSkill.skill_name.toLowerCase());
    const actual = userSkill ? Math.round(userSkill.validated_score || userSkill.self_rating || 0) : 0;
    const required = roleSkill.required_level;
    const weight = roleSkill.weight || 1;

    const gap = Math.max(0, required - actual);
    const gapPercent = (gap / required) * 100;
    const priority = gap * weight;

    totalGapPercent += gapPercent;
    details.push({
      skill: roleSkill.skill_name,
      required,
      actual,
      gap,
      gapPercent,
      priority
    });
  });

  return {
    gapPercentage: roleSkills.length > 0 ? totalGapPercent / roleSkills.length : 0,
    details
  };
};
