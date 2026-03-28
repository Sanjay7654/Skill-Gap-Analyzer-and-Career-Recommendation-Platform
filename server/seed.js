import supabase from './config/supabaseClient.js';

const seed = async () => {
    console.log("🌱 Seeding Comprehensive SkillGap Data...");

    // 1. Users
    const users = [
        { name: 'John Doe', email: 'john@example.com', password_hash: '$2b$10$abcdefghijklmnopqrstuv' },
        { name: 'Jane Smith', email: 'jane@example.com', password_hash: '$2b$10$abcdefghijklmnopqrstuv' }
    ];
    const { data: createdUsers, error: userError } = await supabase.from('users').insert(users).select();
    if (userError) return console.error("❌ User Error:", userError);
    console.log("✅ Users Inserted.");

    const john = createdUsers.find(u => u.email === 'john@example.com');
    const jane = createdUsers.find(u => u.email === 'jane@example.com');

    // 2. User Profiles
    const profiles = [
        { user_id: john.id, education: 'BTech Computer Science', experience_level: 'Beginner', preferred_domain: 'Web Development' },
        { user_id: jane.id, education: 'MCA', experience_level: 'Intermediate', preferred_domain: 'Data Science' }
    ];
    await supabase.from('user_profiles').insert(profiles);
    console.log("✅ User Profiles Inserted.");

    // 3. Career Roles
    const roles = [
        { career_name: 'Frontend Developer', domain: 'Web Development', description: 'Specializes in user interfaces and client-side logic.' },
        { career_name: 'Backend Developer', domain: 'Web Development', description: 'Specializes in server-side logic and database management.' },
        { career_name: 'Data Analyst', domain: 'Data Science', description: 'Extracts insights from data to support decision-making.' }
    ];
    const { data: createdRoles, error: roleError } = await supabase.from('career_roles').insert(roles).select();
    if (roleError) return console.error("❌ Role Error:", roleError);
    console.log("✅ Roles Inserted.");

    const frontendRole = createdRoles.find(r => r.career_name === 'Frontend Developer');
    const dataAnalystRole = createdRoles.find(r => r.career_name === 'Data Analyst');

    // 4. Role Skills
    const roleSkills = [
        { role_id: frontendRole.id, skill_name: 'HTML', required_level: 4, weight: 0.2 },
        { role_id: frontendRole.id, skill_name: 'CSS', required_level: 4, weight: 0.2 },
        { role_id: frontendRole.id, skill_name: 'JavaScript', required_level: 5, weight: 0.4 },
        { role_id: frontendRole.id, skill_name: 'React', required_level: 4, weight: 0.2 },
        { role_id: dataAnalystRole.id, skill_name: 'Python', required_level: 4, weight: 0.4 },
        { role_id: dataAnalystRole.id, skill_name: 'SQL', required_level: 5, weight: 0.4 }
    ];
    await supabase.from('role_skills').insert(roleSkills);
    console.log("✅ Role Skills Inserted.");

    // 5. User Skills
    const userSkills = [
        { user_id: john.id, skill_name: 'HTML', self_rating: 4, quiz_score: 3, validated_score: 3.5 },
        { user_id: john.id, skill_name: 'CSS', self_rating: 3, quiz_score: 4, validated_score: 3.5 },
        { user_id: jane.id, skill_name: 'Python', self_rating: 4, quiz_score: 4, validated_score: 4.0 }
    ];
    await supabase.from('user_skills').insert(userSkills);
    console.log("✅ User Skills Inserted.");

    // 6. Learning Resources
    const resources = [
        { skill_name: 'HTML', title: 'MDN HTML Guide', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML', difficulty: 'Beginner', resource_type: 'Documentation' },
        { skill_name: 'React', title: 'React Official Tutorial', link: 'https://react.dev/learn', difficulty: 'Intermediate', resource_type: 'Course' }
    ];
    await supabase.from('learning_resources').insert(resources);
    console.log("✅ Learning Resources Inserted.");

    // 7. Gap Scores (Dummy)
    await supabase.from('gap_scores').insert([
        { user_id: john.id, role_id: frontendRole.id, skill_name: 'JavaScript', required_skill: 5, user_skill: 0, gap_value: 5, gap_percentage: 100, priority_score: 1.0 }
    ]);
    console.log("✅ Gap Scores Inserted.");

    // 8. Confidence Scores
    await supabase.from('confidence_scores').insert([
        { user_id: john.id, skill_name: 'HTML', self_rating: 4, quiz_score: 3, confidence_gap: 1.0, confidence_reliability: 0.75 }
    ]);

    // 9. Skill Stability
    await supabase.from('skill_stability').insert([
        { user_id: john.id, mean_skill_score: 3.5, standard_deviation: 0.5, stability_score: 0.85 }
    ]);

    // 10. Career Risk Scores
    await supabase.from('career_risk_scores').insert([
        { user_id: john.id, role_id: frontendRole.id, skill_gap_score: 0.6, instability_score: 0.15, confidence_mismatch: 0.2, career_risk_index: 0.35 }
    ]);

    // 11. Career Scores
    await supabase.from('career_scores').insert([
        { user_id: john.id, role_id: frontendRole.id, skill_match_score: 0.45, stability_score: 0.85, confidence_score: 0.75, interest_alignment: 0.9, learning_adaptability: 0.8, career_risk: 0.35, final_suitability_score: 0.72 }
    ]);

    // 12. Learning Roadmaps
    await supabase.from('learning_roadmaps').insert([
        { role_id: frontendRole.id, step_number: 1, skill_name: 'HTML/CSS', description: 'Master web structure.' },
        { role_id: frontendRole.id, step_number: 2, skill_name: 'JavaScript', description: 'Learn logic.' }
    ]);

    console.log("✨ All 12 Tables Seeded Successfully.");
};

seed();
