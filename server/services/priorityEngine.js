export const calculateSkillPriority = (gap, weight) => {
  // priority = weight * gap
  return (gap || 0) * (weight || 1);
};

export const generateRoadmap = async (skillsWithGaps) => {
  if (!skillsWithGaps || skillsWithGaps.length === 0) return [];

  // skillsWithGaps: [{ skill_name, gap, weight }]
  const prioritizedSkills = skillsWithGaps
    .map(s => ({
      ...s,
      priority: calculateSkillPriority(s.gap, s.weight)
    }))
    .sort((a, b) => b.priority - a.priority);

  return prioritizedSkills.map((skill, index) => ({
    week: index + 1,
    skill: skill.skill_name,
    gap: skill.gap,
    priority: skill.priority
  }));
};

