-- ============================================================
-- SKILLGAP ANALYZER - COMPLETE SEED DATA
-- Run this in Supabase SQL Editor (Table Editor > SQL Editor)
-- NO hardcoded UUIDs - DB generates them automatically
-- ============================================================


-- ============================================================
-- 4. CAREER ROLES (Run this FIRST - other tables depend on it)
-- ============================================================
INSERT INTO career_roles (career_name, description, domain) VALUES
('Frontend Developer',    'Builds user interfaces for web applications',           'Web Development'),
('Backend Developer',     'Develops server side logic and APIs',                   'Software Engineering'),
('Full Stack Developer',  'Handles both frontend and backend development',         'Web Development'),
('Data Analyst',          'Analyzes and interprets complex data',                  'Data Science'),
('Cybersecurity Analyst', 'Protects systems from cyber threats',                   'Cybersecurity'),
('DevOps Engineer',       'Manages CI/CD pipelines and infrastructure',            'Cloud Engineering'),
('Software Developer',    'Designs and builds software applications',              'Software Engineering'),
('Cloud Engineer',        'Designs and manages cloud infrastructure and services', 'Cloud Computing');


-- ============================================================
-- 5. ROLE SKILLS
-- ============================================================

-- 1. Frontend Developer
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'HTML',              4, 0.15 FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'CSS',               4, 0.15 FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'JavaScript',        4, 0.20 FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'React',             3, 0.15 FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Responsive Design', 3, 0.10 FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Git',               3, 0.10 FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'UI/UX Basics',      3, 0.15 FROM career_roles WHERE career_name = 'Frontend Developer';

-- 2. Backend Developer
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Java',              4, 0.20 FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Spring Boot',       3, 0.15 FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'SQL',               4, 0.15 FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'REST API',          3, 0.15 FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Database Design',   3, 0.10 FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Authentication',    3, 0.10 FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Microservices',     3, 0.15 FROM career_roles WHERE career_name = 'Backend Developer';

-- 3. Full Stack Developer
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'HTML',              4, 0.10 FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'CSS',               4, 0.10 FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'JavaScript',        4, 0.15 FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'React',             3, 0.15 FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Node.js',           3, 0.15 FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'SQL',               3, 0.15 FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'API Development',   3, 0.20 FROM career_roles WHERE career_name = 'Full Stack Developer';

-- 4. Data Analyst
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Python',             4, 0.20 FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'SQL',                4, 0.20 FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Statistics',         3, 0.15 FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Data Visualization', 3, 0.15 FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Excel',              3, 0.10 FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Power BI',           3, 0.10 FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Data Cleaning',      3, 0.10 FROM career_roles WHERE career_name = 'Data Analyst';

-- 5. Cybersecurity Analyst
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Network Security',    4, 0.20 FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Ethical Hacking',     3, 0.15 FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Cryptography',        3, 0.15 FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Linux',               3, 0.10 FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Security Monitoring', 3, 0.15 FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Penetration Testing', 3, 0.15 FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Incident Response',   3, 0.10 FROM career_roles WHERE career_name = 'Cybersecurity Analyst';

-- 6. DevOps Engineer
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Linux',                  4, 0.20 FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Docker',                 3, 0.15 FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Kubernetes',             3, 0.15 FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'CI/CD',                  3, 0.15 FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Cloud Computing',        3, 0.15 FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Infrastructure as Code', 3, 0.10 FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Monitoring Tools',       3, 0.10 FROM career_roles WHERE career_name = 'DevOps Engineer';

-- 7. Software Developer
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Java',             4, 0.20 FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Data Structures',  4, 0.20 FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Algorithms',       4, 0.20 FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'OOP',              3, 0.15 FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Git',              3, 0.10 FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Software Testing', 3, 0.10 FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'System Design',    3, 0.05 FROM career_roles WHERE career_name = 'Software Developer';

-- 8. Cloud Engineer
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Cloud Computing',        4, 0.20 FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'AWS',                    4, 0.20 FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Linux',                  4, 0.15 FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Docker',                 3, 0.15 FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Kubernetes',             3, 0.10 FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Networking',             3, 0.10 FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO role_skills (role_id, skill_name, required_level, weight)
SELECT id, 'Infrastructure as Code', 3, 0.10 FROM career_roles WHERE career_name = 'Cloud Engineer';


-- ============================================================
-- 6. LEARNING RESOURCES
-- ============================================================
INSERT INTO learning_resources (skill_name, title, link, difficulty, resource_type) VALUES
('HTML',              'MDN HTML Guide',              'https://developer.mozilla.org/en-US/docs/Web/HTML',         'Beginner',     'Documentation'),
('HTML',              'HTML Full Course - freeCodeCamp', 'https://www.youtube.com/watch?v=pQN-pnXPaVg',          'Beginner',     'Video'),
('CSS',               'CSS Tricks',                  'https://css-tricks.com/',                                   'Beginner',     'Website'),
('CSS',               'CSS Full Course - freeCodeCamp', 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',           'Beginner',     'Video'),
('JavaScript',        'Eloquent JavaScript',         'https://eloquentjavascript.net/',                           'Intermediate', 'Book'),
('JavaScript',        'JavaScript.info',             'https://javascript.info/',                                  'Beginner',     'Documentation'),
('React',             'React Official Docs',         'https://react.dev/',                                        'Intermediate', 'Documentation'),
('React',             'React Tutorial - Scrimba',    'https://scrimba.com/learn/learnreact',                     'Intermediate', 'Course'),
('Node.js',           'Node.js Official Docs',       'https://nodejs.org/en/docs/',                               'Intermediate', 'Documentation'),
('Node.js',           'Node.js Crash Course',        'https://www.youtube.com/watch?v=fBNz5xF-Kx4',              'Beginner',     'Video'),
('Python',            'Python for Everybody',        'https://www.py4e.com/',                                     'Beginner',     'Course'),
('Python',            'Automate the Boring Stuff',   'https://automatetheboringstuff.com/',                       'Intermediate', 'Book'),
('SQL',               'SQLZoo',                      'https://sqlzoo.net/',                                       'Beginner',     'Interactive'),
('SQL',               'Mode Analytics SQL Tutorial', 'https://mode.com/sql-tutorial/',                           'Intermediate', 'Course'),
('Java',              'Java Programming - MOOC',     'https://java-programming.mooc.fi/',                         'Beginner',     'Course'),
('Java',              'Java Brains YouTube',         'https://www.youtube.com/c/JavaBrainsChannel',               'Intermediate', 'Video'),
('Spring Boot',       'Spring Official Docs',        'https://spring.io/guides',                                  'Intermediate', 'Documentation'),
('REST API',          'REST API Tutorial',           'https://restfulapi.net/',                                   'Beginner',     'Website'),
('Git',               'Git Official Docs',           'https://git-scm.com/doc',                                   'Beginner',     'Documentation'),
('Git',               'Learn Git Branching',         'https://learngitbranching.js.org/',                        'Beginner',     'Interactive'),
('Linux',             'Linux Command Line Basics',   'https://ubuntu.com/tutorials/command-line-for-beginners',   'Beginner',     'Tutorial'),
('Linux',             'The Linux Command Line Book',  'https://linuxcommand.org/tlcl.php',                        'Intermediate', 'Book'),
('Docker',            'Docker Official Docs',        'https://docs.docker.com/',                                  'Intermediate', 'Documentation'),
('Docker',            'Docker Tutorial - TechWorld',  'https://www.youtube.com/watch?v=3c-iBn73dDE',              'Beginner',     'Video'),
('Kubernetes',        'Kubernetes Official Docs',    'https://kubernetes.io/docs/',                               'Advanced',     'Documentation'),
('CI/CD',             'GitHub Actions Docs',         'https://docs.github.com/en/actions',                       'Intermediate', 'Documentation'),
('Cloud Computing',   'AWS Cloud Practitioner',      'https://aws.amazon.com/certification/certified-cloud-practitioner/', 'Beginner', 'Certification'),
('AWS',               'AWS Free Training',           'https://aws.amazon.com/training/',                          'Intermediate', 'Course'),
('Network Security',  'CompTIA Security+ Guide',     'https://www.comptia.org/certifications/security',           'Intermediate', 'Certification'),
('Ethical Hacking',   'TryHackMe',                   'https://tryhackme.com/',                                   'Beginner',     'Interactive'),
('Penetration Testing','Hack The Box',               'https://www.hackthebox.com/',                               'Advanced',     'Interactive'),
('Cryptography',      'Cryptography I - Coursera',   'https://www.coursera.org/learn/crypto',                    'Intermediate', 'Course'),
('Statistics',        'Khan Academy Statistics',     'https://www.khanacademy.org/math/statistics-probability',   'Beginner',     'Course'),
('Data Visualization','Tableau Public Training',     'https://public.tableau.com/en-us/s/resources',              'Beginner',     'Course'),
('Power BI',          'Microsoft Power BI Docs',     'https://learn.microsoft.com/en-us/power-bi/',               'Beginner',     'Documentation'),
('Data Cleaning',     'Pandas Documentation',        'https://pandas.pydata.org/docs/',                           'Intermediate', 'Documentation'),
('Data Structures',   'DSA - GeeksforGeeks',         'https://www.geeksforgeeks.org/data-structures/',            'Intermediate', 'Website'),
('Algorithms',        'Algorithms - Khan Academy',   'https://www.khanacademy.org/computing/computer-science/algorithms', 'Intermediate', 'Course'),
('OOP',               'OOP in Java - Udemy',         'https://www.udemy.com/course/java-the-complete-java-developer-course/', 'Intermediate', 'Course'),
('System Design',     'System Design Primer',        'https://github.com/donnemartin/system-design-primer',       'Advanced',     'Documentation'),
('Infrastructure as Code', 'Terraform Docs',         'https://developer.hashicorp.com/terraform',                 'Intermediate', 'Documentation'),
('Networking',        'Computer Networking - Coursera', 'https://www.coursera.org/learn/computer-networking',     'Beginner',     'Course'),
('UI/UX Basics',      'Google UX Design Certificate','https://www.coursera.org/professional-certificates/google-ux-design', 'Beginner', 'Course'),
('API Development',   'Postman Learning Center',     'https://learning.postman.com/',                             'Beginner',     'Documentation'),
('Software Testing',  'ISTQB Testing Foundation',   'https://www.istqb.org/',                                    'Intermediate', 'Certification'),
('Monitoring Tools',  'Prometheus Docs',             'https://prometheus.io/docs/',                               'Intermediate', 'Documentation'),
('Microservices',     'Microservices.io',            'https://microservices.io/',                                  'Advanced',     'Website'),
('Database Design',   'Database Design - FreeCodeCamp', 'https://www.youtube.com/watch?v=ztHopE5Wnpc',           'Beginner',     'Video'),
('Authentication',    'JWT.io Introduction',         'https://jwt.io/introduction/',                              'Intermediate', 'Documentation'),
('Responsive Design', 'Responsive Web Design - freeCodeCamp', 'https://www.freecodecamp.org/learn/responsive-web-design/', 'Beginner', 'Course'),
('Excel',             'Excel for Beginners',         'https://support.microsoft.com/en-us/excel',                 'Beginner',     'Documentation');


-- ============================================================
-- 12. LEARNING ROADMAPS (one roadmap per career role)
-- ============================================================

-- 1. Frontend Developer
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 1, 'HTML',              'Learn HTML structure, tags, forms and semantic elements'   FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 2, 'CSS',               'Master styling, flexbox, grid and animations'              FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 3, 'Responsive Design', 'Build layouts that work on all screen sizes'              FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 4, 'JavaScript',        'Learn core JS, DOM manipulation and ES6+ features'        FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 5, 'Git',               'Version control basics, branches and pull requests'       FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 6, 'React',             'Build modern component-based UIs and manage state'        FROM career_roles WHERE career_name = 'Frontend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 7, 'UI/UX Basics',      'Understand user experience principles and design systems' FROM career_roles WHERE career_name = 'Frontend Developer';

-- 2. Backend Developer
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 1, 'Java',            'Learn core Java OOP concepts and syntax'                   FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 2, 'SQL',             'Master relational databases and query writing'              FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 3, 'Database Design', 'Learn schema design, normalization and indexing'           FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 4, 'REST API',        'Build and consume REST APIs following best practices'      FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 5, 'Spring Boot',     'Build production-grade backend services with Spring Boot'  FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 6, 'Authentication',  'Implement JWT, OAuth2 and session management'              FROM career_roles WHERE career_name = 'Backend Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 7, 'Microservices',   'Design loosely-coupled distributed backend services'       FROM career_roles WHERE career_name = 'Backend Developer';

-- 3. Full Stack Developer
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 1, 'HTML',            'Web structure basics'                                      FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 2, 'CSS',             'Styling and responsive design'                             FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 3, 'JavaScript',      'Core programming and browser interaction'                  FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 4, 'React',           'Build dynamic frontend interfaces'                         FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 5, 'Node.js',         'JavaScript on the server side'                             FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 6, 'SQL',             'Database queries and management'                           FROM career_roles WHERE career_name = 'Full Stack Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 7, 'API Development', 'Build and connect frontend to backend via APIs'            FROM career_roles WHERE career_name = 'Full Stack Developer';

-- 4. Data Analyst
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 1, 'Excel',             'Data organization and basic analysis'                             FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 2, 'SQL',               'Query databases to extract and filter data'                       FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 3, 'Python',            'Automate data tasks and use pandas for analysis'                  FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 4, 'Statistics',        'Understand mean, median, correlation and distributions'           FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 5, 'Data Cleaning',     'Handle missing values, duplicates and data formatting'            FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 6, 'Data Visualization','Build charts and dashboards to present insights'                  FROM career_roles WHERE career_name = 'Data Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 7, 'Power BI',          'Create interactive business intelligence reports'                 FROM career_roles WHERE career_name = 'Data Analyst';

-- 5. Cybersecurity Analyst
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 1, 'Linux',              'Master the Linux OS used in most security environments'          FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 2, 'Networking',         'TCP/IP, DNS, firewalls and network protocols'                    FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 3, 'Network Security',   'Protect networks from attacks and unauthorized access'           FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 4, 'Cryptography',       'Understand encryption algorithms and protocols'                  FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 5, 'Ethical Hacking',    'Learn to think like an attacker to find vulnerabilities'         FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 6, 'Penetration Testing','Run controlled attacks to test system security'                   FROM career_roles WHERE career_name = 'Cybersecurity Analyst';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 7, 'Incident Response',  'Handle and recover from active security breaches'                FROM career_roles WHERE career_name = 'Cybersecurity Analyst';

-- 6. DevOps Engineer
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 1, 'Linux',                  'OS fundamentals, shell scripting and file systems'           FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 2, 'Git',                    'Version control and collaborative workflows'                 FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 3, 'CI/CD',                  'Automate build, test and deployment pipelines'              FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 4, 'Docker',                 'Containerize applications for consistent environments'       FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 5, 'Kubernetes',             'Orchestrate and scale containers in production'              FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 6, 'Cloud Computing',        'Deploy and manage services on AWS/GCP/Azure'                FROM career_roles WHERE career_name = 'DevOps Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 7, 'Infrastructure as Code', 'Manage servers using Terraform and Ansible'                 FROM career_roles WHERE career_name = 'DevOps Engineer';

-- 7. Software Developer
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 1, 'Java',            'Learn Java syntax, classes, interfaces and collections'     FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 2, 'OOP',             'Master object-oriented design principles (SOLID)'           FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 3, 'Data Structures', 'Arrays, linked lists, stacks, queues, trees and graphs'    FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 4, 'Algorithms',      'Sorting, searching, dynamic programming and complexity'    FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 5, 'Git',             'Version control and team collaboration'                    FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 6, 'Software Testing','Unit testing, integration testing and test-driven design'  FROM career_roles WHERE career_name = 'Software Developer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 7, 'System Design',   'Design scalable and maintainable software architectures'   FROM career_roles WHERE career_name = 'Software Developer';

-- 8. Cloud Engineer
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 1, 'Linux',                  'OS and shell scripting fundamentals'                          FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 2, 'Networking',             'IP, DNS, VPCs, subnets and routing'                          FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 3, 'Cloud Computing',        'Core cloud concepts: IaaS, PaaS, SaaS'                       FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 4, 'AWS',                    'Deploy and manage services on Amazon Web Services'            FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 5, 'Docker',                 'Containerize and package cloud applications'                  FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 6, 'Kubernetes',             'Orchestrate containers at cloud scale'                        FROM career_roles WHERE career_name = 'Cloud Engineer';
INSERT INTO learning_roadmaps (role_id, step_number, skill_name, description)
SELECT id, 7, 'Infrastructure as Code', 'Automate cloud provisioning using Terraform'                  FROM career_roles WHERE career_name = 'Cloud Engineer';
