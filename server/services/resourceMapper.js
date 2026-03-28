import supabase from '../config/supabaseClient.js';

export const getResourcesForSkills = async (skills) => {

  if (!skills || skills.length === 0) return [];

 
  const uniqueSkills = [...new Set(skills)];

  const { data, error } = await supabase
    .from('learning_resources')
    .select('*')
    .in('skill_name', uniqueSkills);

  if (error) throw error;


  const uniqueResources = [
    ...new Map(data.map(item => [item.id, item])).values()
  ];

  return uniqueResources;
};
