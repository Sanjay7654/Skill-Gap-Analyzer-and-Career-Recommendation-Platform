import supabase from '../config/supabaseClient.js';

/**
 * Fetches all career roles with their required skills from the DB.
 * Returns a map: { roleName -> [{ skill_name, required_level, weight }] }
 */
export const getRoleSkillMap = async () => {
    const { data: roles, error } = await supabase
        .from('career_roles')
        .select('id, career_name, role_skills(skill_name, required_level, weight)');

    if (error) throw error;

    const map = {};
    roles.forEach(role => {
        map[role.career_name] = role.role_skills;
    });

    return map;
};

/**
 * Fetches required skills for a single role by roleId.
 * Returns [{ skill_name, required_level, weight }]
 */
export const getSkillsForRole = async (roleId) => {
    const { data, error } = await supabase
        .from('role_skills')
        .select('skill_name, required_level, weight')
        .eq('role_id', roleId);

    if (error) throw error;
    return data;
};

/**
 * Fetches all roles from the DB.
 * Returns [{ id, career_name, description, domain }]
 */
export const getAllRoles = async () => {
    const { data, error } = await supabase
        .from('career_roles')
        .select('id, career_name, description, domain');

    if (error) throw error;
    return data;
};
