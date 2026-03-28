import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const generateQuizQuestions = async (req, res) => {
    const { domain, ratings } = req.body;
    
    if (!domain || !ratings) {
        return res.status(400).json({ error: "Domain and ratings are required" });
    }

    try {
        const ratingsSummary = Object.entries(ratings)
            .filter(([_, level]) => level > 0)
            .map(([skill, level]) => `${skill}: Level ${level}/5`)
            .join(", ");

        const prompt = `
            Task: Professionally assess a candidate's ${domain} skills.
            Data: ${ratingsSummary}.
            
            Requirements:
            1. Scale depth to rating (Level 1-2: Foundations; 3: Practical; 4-5: Architecture/Performance).
            2. At least 60% technical/coding focus.
            3. Include multiple "Predict the output" or "Identify the bug" challenges. 
               CRITICAL: You MUST wrap all code blocks in triple backticks (\`\`\`).
               CRITICAL: You MUST break code into multiple lines using "\\n" inside the JSON string.
            4. VERY IMPORTANT: Generate EXACTLY 10 questions.
            5. Each question MUST have EXACTLY 4 distinct, descriptive options.
            6. CRITICAL: DO NOT include the option labels (A, B, C, D) or the option contents inside the question text ("q"). The question text should ONLY contain the prompt and any related code.
            7. CHAIN OF THOUGHT: You MUST generate an internal "explanation" string BEFORE the "answer" index. 
            
            Output: VALID JSON OBJECT ONLY.
            Format STRICTLY as: { "questions": [{"q": "The question prompt here... \\n\`\`\`code\`\`\`", "options": ["Meaningful option 1", "Meaningful option 2", "Meaningful option 3", "Meaningful option 4"], "explanation": "Step-by-step logic.", "answer": 0}] }
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert technical interviewer. Output only valid JSON arrays."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.5,
            response_format: { type: "json_object" }
        });

        const responseText = completion.choices[0]?.message?.content || "";
        
        // Groq sometimes returns the JSON inside an object if specified, or just the array
        let questions;
        const parsed = JSON.parse(responseText);
        questions = Array.isArray(parsed) ? parsed : (parsed.questions || parsed.data || []);

        res.json({ data: questions });
    } catch (err) {
        console.error("Groq/AI Controller Error:", err);
        res.status(500).json({ 
            error: "Assessment engine temporarily unavailable.",
            details: err.message,
            recommendation: "Load standard evaluation suite." 
        });
    }
};

export const generateStudyRoadmap = async (req, res) => {
    const { skillName, score } = req.body;
    
    if (!skillName) {
        return res.status(400).json({ error: "Skill name is required" });
    }

    try {
        const prompt = `
            Task: Create a highly actionable, 3-step masterclass study roadmap for exactly one skill.
            Skill: ${skillName} (Current Level: ${score}/5)
            
            Requirements:
            1. Output MUST be an array of EXACTLY 3 JSON objects.
            2. Each object represents one progression step.
            
            Output: VALID JSON OBJECT ONLY.
            Format STRICTLY as: { "roadmap": [{"step": "Title of step", "description": "1 sentence specific technical action based on the current level."}] }
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert technical mentor. Output only valid JSON."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.6,
            response_format: { type: "json_object" }
        });

        const responseText = completion.choices[0]?.message?.content || "";
        const parsed = JSON.parse(responseText);
        const roadmap = Array.isArray(parsed) ? parsed : (parsed.roadmap || parsed.data || []);

        res.json({ data: roadmap });
    } catch (err) {
        console.error("Groq/AI Roadmap Error:", err);
        res.status(500).json({ error: "Roadmap engine temporarily unavailable." });
    }
};
