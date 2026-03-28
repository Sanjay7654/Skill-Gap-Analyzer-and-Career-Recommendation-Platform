-- 1. Create users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create user_profiles Table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    education TEXT,
    experience_level TEXT,
    preferred_domain TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create user_skills Table
CREATE TABLE user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    self_rating INT,
    quiz_score INT,
    validated_score FLOAT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create career_roles Table
CREATE TABLE career_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_name TEXT NOT NULL,
    description TEXT,
    domain TEXT
);

-- 5. Create role_skills Table
CREATE TABLE role_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID REFERENCES career_roles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    required_level INT,
    weight FLOAT
);

-- 6. Create learning_resources Table
CREATE TABLE learning_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_name TEXT,
    title TEXT,
    link TEXT,
    difficulty TEXT,
    resource_type TEXT
);

-- 7. Create gap_scores Table
CREATE TABLE gap_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES career_roles(id) ON DELETE CASCADE,
    skill_name TEXT,
    required_skill INT,
    user_skill INT,
    gap_value INT,
    gap_percentage FLOAT,
    priority_score FLOAT
);

-- 8. Create confidence_scores Table
CREATE TABLE confidence_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_name TEXT,
    self_rating INT,
    quiz_score INT,
    confidence_gap FLOAT,
    confidence_reliability FLOAT
);

-- 9. Create skill_stability Table
CREATE TABLE skill_stability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mean_skill_score FLOAT,
    standard_deviation FLOAT,
    stability_score FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Create career_risk_scores Table
CREATE TABLE career_risk_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES career_roles(id) ON DELETE CASCADE,
    skill_gap_score FLOAT,
    instability_score FLOAT,
    confidence_mismatch FLOAT,
    career_risk_index FLOAT
);

-- 11. Create career_scores Table
CREATE TABLE career_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES career_roles(id) ON DELETE CASCADE,
    skill_match_score FLOAT,
    stability_score FLOAT,
    confidence_score FLOAT,
    interest_alignment FLOAT,
    learning_adaptability FLOAT,
    career_risk FLOAT,
    final_suitability_score FLOAT,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Create learning_roadmaps Table
CREATE TABLE learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID REFERENCES career_roles(id) ON DELETE CASCADE,
    step_number INT,
    skill_name TEXT,
    description TEXT
);
