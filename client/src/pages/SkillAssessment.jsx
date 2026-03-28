import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

// ─── Domain → Skills mapping ───────────────────────────────────────────────
const DOMAIN_SKILLS = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "Git", "UI/UX Basics"],
  "Backend Developer": ["Java", "Spring Boot", "SQL", "REST API", "Database Design", "Authentication", "Microservices"],
  "Full Stack Developer": ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "API Development"],
  "Data Analyst": ["Python", "SQL", "Statistics", "Data Visualization", "Excel", "Power BI", "Data Cleaning"],
  "Cybersecurity Analyst": ["Network Security", "Ethical Hacking", "Cryptography", "Linux", "Security Monitoring", "Penetration Testing", "Incident Response"],
  "DevOps Engineer": ["Linux", "Docker", "Kubernetes", "CI/CD", "Cloud Computing", "Infrastructure as Code", "Monitoring Tools"],
  "Software Developer": ["Java", "Data Structures", "Algorithms", "OOP", "Git", "Software Testing", "System Design"],
  "Cloud Engineer": ["Cloud Computing", "AWS", "Linux", "Docker", "Kubernetes", "Networking", "Infrastructure as Code"],
};

// ─── Quiz questions per domain (10 each) ──────────────────────────────────
const QUIZ_QUESTIONS = {
  "Frontend Developer": [
    { q: "Which HTML tag is used to link an external CSS file?", options: ["<style>", "<link>", "<script>", "<css>"], answer: 1 },
    { q: "Which CSS property controls the spacing between elements?", options: ["padding", "margin", "gap", "border"], answer: 1 },
    { q: "What does 'DOM' stand for in JavaScript?", options: ["Document Object Model", "Data Object Map", "Dynamic Object Method", "Document Order Model"], answer: 0 },
    { q: "Which React hook is used to manage state?", options: ["useEffect", "useContext", "useState", "useRef"], answer: 2 },
    { q: "What does CSS Flexbox's 'justify-content: center' do?", options: ["Centers vertically", "Centers horizontally", "Adds margin", "Aligns to top"], answer: 1 },
    { q: "Which keyword declares a constant in JavaScript?", options: ["var", "let", "const", "def"], answer: 2 },
    { q: "In React, what is used to pass data from parent to child?", options: ["State", "Props", "Context", "Refs"], answer: 1 },
    { q: "What does 'responsive design' primarily use?", options: ["JavaScript", "Media queries", "PHP", "SQL"], answer: 1 },
    { q: "Which Git command saves changes to the local repo?", options: ["git push", "git pull", "git commit", "git add"], answer: 2 },
    { q: "What is the purpose of 'alt' attribute in <img>?", options: ["Set image size", "Link image", "Describe image for accessibility", "Style image"], answer: 2 },
  ],
  "Backend Developer": [
    { q: "What does REST stand for?", options: ["Remote Execution Standard Transfer", "Representational State Transfer", "Request Entity State Tool", "Remote Entity Service Transfer"], answer: 1 },
    { q: "Which Spring Boot annotation marks the entry point?", options: ["@Component", "@Controller", "@SpringBootApplication", "@Service"], answer: 2 },
    { q: "What SQL clause is used to filter results?", options: ["HAVING", "ORDER BY", "WHERE", "GROUP BY"], answer: 2 },
    { q: "What does JWT stand for?", options: ["Java Web Token", "JSON Web Token", "JavaScript Web Transfer", "JSON Web Transfer"], answer: 1 },
    { q: "Which HTTP method is used to create a resource in REST?", options: ["GET", "DELETE", "PUT", "POST"], answer: 3 },
    { q: "What is database normalization?", options: ["Copying data", "Reducing redundancy in tables", "Adding more columns", "Creating indexes"], answer: 1 },
    { q: "What is a microservice?", options: ["A small CSS file", "A single small deployable service", "A database table", "A type of HTTP request"], answer: 1 },
    { q: "Which SQL join returns only matching rows from both tables?", options: ["LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "INNER JOIN"], answer: 3 },
    { q: "What is bcrypt used for?", options: ["Database querying", "Password hashing", "API routing", "File compression"], answer: 1 },
    { q: "Which status code means 'not found' in HTTP?", options: ["200", "401", "500", "404"], answer: 3 },
  ],
  "Full Stack Developer": [
    { q: "What is Node.js?", options: ["A browser", "A JavaScript runtime for the server", "A CSS framework", "A database"], answer: 1 },
    { q: "Which command initializes a Node project?", options: ["npm start", "node init", "npm init", "npm install"], answer: 2 },
    { q: "What does API stand for?", options: ["Application Programming Interface", "App Process Input", "Automated Program Interface", "Application Process Input"], answer: 0 },
    { q: "In React, what hook runs code after render?", options: ["useState", "useCallback", "useEffect", "useMemo"], answer: 2 },
    { q: "Which HTTP method updates an existing resource?", options: ["GET", "PUT", "DELETE", "HEAD"], answer: 1 },
    { q: "What is a primary key in SQL?", options: ["A unique identifier for a row", "The first column", "A foreign key reference", "An index"], answer: 0 },
    { q: "Which CSS unit is relative to the viewport width?", options: ["px", "em", "rem", "vw"], answer: 3 },
    { q: "What does 'async/await' handle in JavaScript?", options: ["CSS animations", "DOM events", "Asynchronous operations", "Form validation"], answer: 2 },
    { q: "Which tool manages packages in a Node project?", options: ["pip", "maven", "npm", "composer"], answer: 2 },
    { q: "What does CORS stand for?", options: ["Cross-Origin Resource Sharing", "Core Object Request Service", "Common Object Routing Standard", "Cross-Object Resource Server"], answer: 0 },
  ],
  "Data Analyst": [
    { q: "What does 'mean' refer to in statistics?", options: ["Middle value", "Most frequent value", "Average value", "Maximum value"], answer: 2 },
    { q: "Which Python library is used for data manipulation?", options: ["NumPy", "Matplotlib", "Pandas", "Scikit-learn"], answer: 2 },
    { q: "Which SQL function counts rows?", options: ["SUM()", "AVG()", "COUNT()", "MAX()"], answer: 2 },
    { q: "What is a 'null' value in a dataset?", options: ["Zero", "Missing/unknown value", "Negative number", "Duplicate entry"], answer: 1 },
    { q: "What does 'standard deviation' measure?", options: ["Average", "Sum of values", "Spread of data around the mean", "Maximum range"], answer: 2 },
    { q: "Which chart is best for showing trends over time?", options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"], answer: 2 },
    { q: "What does 'data cleaning' involve?", options: ["Sorting data", "Fixing errors and missing values", "Querying databases", "Creating dashboards"], answer: 1 },
    { q: "Which Excel function finds the average of a range?", options: ["=SUM()", "=COUNT()", "=AVERAGE()", "=IF()"], answer: 2 },
    { q: "What does Power BI primarily do?", options: ["Write code", "Create interactive data dashboards", "Manage databases", "Train ML models"], answer: 1 },
    { q: "Which SQL clause groups rows with the same value?", options: ["ORDER BY", "WHERE", "HAVING", "GROUP BY"], answer: 3 },
  ],
  "Cybersecurity Analyst": [
    { q: "What does 'phishing' mean in cybersecurity?", options: ["Hacking a server", "Tricking users into giving credentials", "Breaking encryption", "Port scanning"], answer: 1 },
    { q: "What does 'CIA' stand for in security?", options: ["Central Intelligence Agency", "Code Integrity Analysis", "Confidentiality, Integrity, Availability", "Cyber Incident Analysis"], answer: 2 },
    { q: "Which protocol encrypts web traffic?", options: ["HTTP", "FTP", "HTTPS (TLS)", "SMTP"], answer: 2 },
    { q: "What is a firewall?", options: ["A type of virus", "Hardware/software that filters network traffic", "An encryption tool", "A VPN"], answer: 1 },
    { q: "What does 'penetration testing' aim to do?", options: ["Encrypt data", "Find vulnerabilities before attackers do", "Monitor traffic", "Detect malware"], answer: 1 },
    { q: "Which Linux command lists files in a directory?", options: ["cd", "pwd", "ls", "cat"], answer: 2 },
    { q: "What is a 'zero-day' vulnerability?", options: ["Old known bug", "Unknown vulnerability with no patch yet", "A network attack", "A type of malware"], answer: 1 },
    { q: "What is the purpose of hashing passwords?", options: ["Make them readable", "Compress them", "Store them securely without reversibility", "Encrypt for sending"], answer: 2 },
    { q: "What does IDS stand for?", options: ["Internet Data System", "Intrusion Detection System", "Integrated Defense Service", "Internet Defense Shield"], answer: 1 },
    { q: "Which layer of OSI handles IP addressing?", options: ["Layer 1 – Physical", "Layer 3 – Network", "Layer 4 – Transport", "Layer 7 – Application"], answer: 1 },
  ],
  "DevOps Engineer": [
    { q: "What does CI/CD stand for?", options: ["Code Integration/Code Deployment", "Continuous Integration/Continuous Delivery", "Cloud Infrastructure/Cloud Delivery", "Code Input/Code Development"], answer: 1 },
    { q: "What is Docker used for?", options: ["Version control", "Containerizing applications", "Database management", "Monitoring servers"], answer: 1 },
    { q: "Which tool orchestrates Docker containers at scale?", options: ["Ansible", "Terraform", "Jenkins", "Kubernetes"], answer: 3 },
    { q: "What is Infrastructure as Code (IaC)?", options: ["Writing app code", "Managing infrastructure through code/config files", "Writing SQL scripts", "Building APIs"], answer: 1 },
    { q: "Which command builds a Docker image from a Dockerfile?", options: ["docker run", "docker pull", "docker build", "docker push"], answer: 2 },
    { q: "What is the purpose of a CI pipeline?", options: ["Deploy to production manually", "Automatically build, test and validate code", "Monitor server uptime", "Manage database schemas"], answer: 1 },
    { q: "What is Terraform primarily used for?", options: ["Monitoring", "Provisioning cloud infrastructure", "Container orchestration", "CI/CD pipelines"], answer: 1 },
    { q: "Which Linux command displays running processes?", options: ["ls", "cat", "ps aux", "grep"], answer: 2 },
    { q: "What does 'kubectl get pods' do in Kubernetes?", options: ["Delete pods", "Restart pods", "List running pods", "Build an image"], answer: 2 },
    { q: "What is Prometheus used for?", options: ["Container runtime", "Metrics monitoring and alerting", "CI/CD automation", "Configuration management"], answer: 1 },
  ],
  "Software Developer": [
    { q: "What is a stack data structure?", options: ["First In First Out", "Last In First Out", "Random access", "Sorted list"], answer: 1 },
    { q: "What is time complexity O(n log n) typical of?", options: ["Linear search", "Bubble sort", "Merge sort", "Binary search"], answer: 2 },
    { q: "What does OOP stand for?", options: ["Object-Oriented Protocol", "Object-Oriented Programming", "Operation Ordered Process", "Object Operation Process"], answer: 1 },
    { q: "Which OOP concept hides internal details?", options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], answer: 1 },
    { q: "What is a binary search tree?", options: ["A list structure", "A tree where left < root < right", "An array", "A hash table"], answer: 1 },
    { q: "What does 'unit testing' test?", options: ["Entire system", "Individual functions/components in isolation", "Database queries", "Network requests"], answer: 1 },
    { q: "What is Git 'branching' used for?", options: ["Deleting files", "Working on separate features in parallel", "Merging databases", "Deploying code"], answer: 1 },
    { q: "Which sorting algorithm has worst-case O(n²)?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"], answer: 2 },
    { q: "What is a 'design pattern'?", options: ["UI layout template", "Reusable solution to a common software problem", "A type of algorithm", "A database structure"], answer: 1 },
    { q: "What does DRY stand for in software development?", options: ["Do Repeat Yourself", "Don't Repeat Yourself", "Dynamic Runtime Yield", "Direct Runtime Yield"], answer: 1 },
  ],
  "Cloud Engineer": [
    { q: "What does IaaS stand for?", options: ["Internet as a Service", "Infrastructure as a Service", "Integration as a Service", "Input as a Service"], answer: 1 },
    { q: "Which AWS service stores files (objects)?", options: ["EC2", "RDS", "S3", "Lambda"], answer: 2 },
    { q: "What is auto-scaling in cloud?", options: ["Manual server management", "Automatically adjusting resources based on demand", "Encrypting data", "Monitoring traffic"], answer: 1 },
    { q: "What is a VPC in AWS?", options: ["Virtual Private Cloud — isolated network", "Virtual Processing Core", "Volume Performance Controller", "Virtual Protocol Component"], answer: 0 },
    { q: "Which cloud model provides managed software (e.g. Gmail)?", options: ["IaaS", "PaaS", "SaaS", "FaaS"], answer: 2 },
    { q: "What is Kubernetes primarily used for?", options: ["Storage management", "Container orchestration", "Networking", "CI/CD"], answer: 1 },
    { q: "What does 'serverless' mean in cloud?", options: ["No servers exist", "Servers are managed by the provider, billed per use", "Local server only", "On-premise servers"], answer: 1 },
    { q: "Which AWS service runs virtual machines?", options: ["S3", "Lambda", "EC2", "RDS"], answer: 2 },
    { q: "What is Terraform used for?", options: ["Monitoring", "App deployment", "Provisioning infrastructure as code", "Container runtime"], answer: 2 },
    { q: "What does 'high availability' mean?", options: ["Fast CPU speed", "System stays up with minimal downtime", "Large storage", "High bandwidth"], answer: 1 },
  ],
};

// Steps
const STEP_DOMAIN = 0;
const STEP_RATING = 1;
const STEP_QUIZ = 2;
const STEP_SUMMARY = 3;

function SkillAssessment() {
  const [step, setStep] = useState(STEP_DOMAIN);
  const [domain, setDomain] = useState("");
  const [ratings, setRatings] = useState({});
  const [questions, setQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState([]);  // selected answer index per question
  const [loading, setLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const skills = domain ? DOMAIN_SKILLS[domain] : [];
  const currentQ = questions[quizIndex];

  // ── Helpers ─────────────────────────────────────────────────────────────
  const quizScore = () => {
    let correct = 0;
    answers.forEach((ans, i) => { if (ans === questions[i]?.answer) correct++; });
    return correct;
  };

  const renderText = (rawText) => {
    if (!rawText || typeof rawText !== "string") return rawText;
    
    // Sanitize literal escaped newlines that the AI sometimes outputs by mistake
    const text = rawText.replace(/\\n/g, '\n');
    
    // 1. Handle explicit markdown code blocks (```)
    if (text.includes("```")) {
      const parts = text.split("```");
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <div key={index} className="block w-full my-6 font-mono text-left">
              <div className="bg-gray-950 p-6 rounded-2xl border border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.4)] inline-block min-w-full overflow-x-auto">
                <span className="text-xl sm:text-2xl text-white font-bold leading-relaxed whitespace-pre font-mono block">
                 {(() => {
                    let formattedCode = part.replace(/^\n+|\n+$/g, '');
                    if (!formattedCode.includes('\n')) {
                      formattedCode = formattedCode.replace(/;/g, ';\n  ').replace(/{/g, '{\n  ').replace(/}/g, '\n}\n');
                    }
                    return formattedCode;
                 })()}
                </span>
              </div>
            </div>
          );
        }
        return <span key={index}>{renderInlineCode(part)}</span>;
      });
    }

    // 2. Heuristic for AI code questions missing backticks (Checks for multiple newlines or colons followed by newlines and code-like syntax)
    if (!text.includes("`") && text.includes("\n")) {
      const codeSplitMatch = text.match(/:\s*\n|\n\n/);
      if (codeSplitMatch) {
        const splitIndex = codeSplitMatch.index + codeSplitMatch[0].length;
        const mainQuestion = text.substring(0, codeSplitMatch.index + (codeSplitMatch[0].includes(":") ? 1 : 0));
        const codePart = text.substring(splitIndex).trimEnd(); // Keep leading spaces if any, trim end

        // Check if the bottom half looks like code (it has multiple lines of text, a hallmark of un-backticked code snippets)
        if (codePart.split("\n").length >= 2 || (codePart.length > 15 && (codePart.includes("{") || codePart.includes(";") || codePart.includes("import ") || codePart.includes("def ") || codePart.includes("=>") || codePart.includes("class ") || codePart.includes("SELECT ")))) {
           return (
             <span className="block">
               <span className="block mb-4">{mainQuestion}</span>
               <span className="block w-full my-6 font-mono text-left">
                <span className="bg-gray-950 p-6 rounded-2xl border border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.4)] block min-w-full overflow-x-auto">
                  <span className="text-xl sm:text-2xl text-white font-bold leading-relaxed whitespace-pre font-mono block">
                    {(() => {
                      let formatted = codePart.replace(/^\n+|\n+$/g, '');
                      if (!formatted.includes('\n')) {
                        formatted = formatted.replace(/;/g, ';\n  ').replace(/{/g, '{\n  ').replace(/}/g, '\n}\n');
                      }
                      return formatted;
                    })()}
                  </span>
                </span>
               </span>
             </span>
           );
        }
      }
      // If it doesn't meet the heuristic, just preserve spacing
      return <span className="whitespace-pre-wrap leading-relaxed block">{text}</span>;
    }
    
    // 3. Render inline code standard
    return renderInlineCode(text);
  };

  const renderInlineCode = (str) => {
    if (!str.includes("`")) {
        return <span className="whitespace-pre-wrap leading-relaxed">{str}</span>;
    }
    const parts = str.split("`");
    return parts.map((t, i) => {
      if (i % 2 === 1) {
        // Inline code spans (used in options and inline questions)
        return <code key={i} className="bg-gray-800 text-emerald-300 px-2.5 py-1 rounded-md font-mono text-lg shadow-sm font-semibold mx-1 align-middle">{t}</code>;
      }
      return <span key={i} className="whitespace-pre-wrap leading-relaxed">{t}</span>;
    });
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSelectDomain = (d) => {
    setDomain(d);
    // Init ratings to 0
    const init = {};
    DOMAIN_SKILLS[d].forEach(s => { init[s] = 0; });
    setRatings(init);
    setStep(STEP_RATING);
  };

  const fetchAssessmentQuestions = async () => {
    setQuizLoading(true);
    setStep(STEP_QUIZ);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/generate-quiz", {
        domain,
        ratings
      });
      
      const generatedQuestions = res.data.data;
      if (!generatedQuestions || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error("AI engine failed to generate valid questions. Falling back to robust static standard evaluation suite.");
      }

      setQuestions(generatedQuestions);
      if (res.data.info) {
        console.warn(res.data.info);
      }
      setAnswers(new Array(generatedQuestions.length).fill(null));
      setQuizIndex(0);
    } catch (err) {
      console.error("Assessment Error:", err);
      const isQuotaError = err?.response?.status === 429;
      const message = isQuotaError 
        ? "Evaluation limits reached. Loading high-quality standard assessment suite to continue." 
        : "Evaluation service busy. Switching to standard evaluation mode.";
      alert(message);
      
      const genericFallback = [
        { q: "What is a core principle of software architecture?", options: ["Coupling", "Separation of Concerns", "Direct Linking", "Monolithic loops"], answer: 1 },
        { q: "Which tool is used for version control?", options: ["Git", "Docker", "Node", "Jenkins"], answer: 0 },
        { q: "What does API stand for?", options: ["Application Programming Interface", "Advanced Performance Index", "Automated Parsing Integrator", "Application Process Integration"], answer: 0 },
        { q: "Predict the output:\n```javascript\nconsole.log(typeof null);\n```", options: ["\"null\"", "\"undefined\"", "\"object\"", "\"string\""], answer: 2 },
        { q: "Which architectural pattern is best for scalable web apps?", options: ["Microservices", "Monolith", "Peer-to-Peer", "Client-Server"], answer: 0 },
        { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query List", "System Quality Log", "Standard Query Level"], answer: 0 },
        { q: "Which of these is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: 2 },
        { q: "What is the purpose of the 'git clone' command?", options: ["Delete a repository", "Create a copy of a remote repository", "Merge two branches", "List all files"], answer: 1 },
        { q: "Which keyword is used to create a class in JavaScript?", options: ["class", "struct", "object", "define"], answer: 0 },
        { q: "What is the primary role of a Load Balancer?", options: ["Store data", "Distribute network traffic across multiple servers", "Encrypt emails", "Compile code"], answer: 1 }
      ];
      
      const fallback = QUIZ_QUESTIONS[domain] && QUIZ_QUESTIONS[domain].length > 0 
          ? QUIZ_QUESTIONS[domain] 
          : genericFallback;
          
      setQuestions(fallback);
      setAnswers(new Array(fallback.length).fill(null));
      setQuizIndex(0);
      alert(message);
    } finally {
      setQuizLoading(false);
    }
  };

  // Keep scroll position steady at top of the quiz
  useEffect(() => {
    if (step === STEP_QUIZ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [quizIndex, step]);

  const handleRatingNext = () => {
    const rated = Object.values(ratings).filter(v => v > 0).length;
    if (rated === 0) return alert("Please rate at least one skill.");
    fetchAssessmentQuestions();
  };

  const handleAnswer = (optIndex) => {
    setAnswers(prev => {
      const next = [...prev];
      next[quizIndex] = optIndex;
      return next;
    });
  };

  const handleNextQ = () => {
    if (answers[quizIndex] === null) return alert("Please select an answer.");
    if (quizIndex < questions.length - 1) {
      setQuizIndex(q => q + 1);
    } else {
      setStep(STEP_SUMMARY);
    }
  };

  const handlePrevQ = () => {
    if (quizIndex > 0) setQuizIndex(q => q - 1);
  };

  const handleSubmit = async () => {
    const activeUserId = userId || localStorage.getItem("userId");
    if (!activeUserId || activeUserId === "null") return alert("Session lost. Please log in again.");

    const correctAnswers = quizScore();
    const quizScoreVal = Math.round((correctAnswers / questions.length) * 5); // scale to 0-5

    setLoading(true);
    try {
      // Build skill entries combining self-rating (30%) + quiz score (70%)
      // Quiz score dominates because it is the objective measure of actual knowledge.
      // Self-rating alone (which users tend to overestimate) should not grant 'Meets Requirements'.
      const skillEntries = skills.map(skill => ({
        user_id: activeUserId,
        skill_name: skill,
        self_rating: ratings[skill] || 0,
        quiz_score: ratings[skill] > 0 ? quizScoreVal : 0,
        validated_score: ratings[skill] > 0
          ? Math.round(((ratings[skill] || 0) * 0.3) + (quizScoreVal * 0.7))
          : 0
      })).filter(e => e.self_rating > 0 || e.quiz_score > 0);

      // 1. Save assessment
      await axios.post("http://localhost:5000/api/gap/assess", {
        userId: activeUserId,
        skills: skillEntries
      });

      // 2. Run SkillGap analysis
      await axios.get(`http://localhost:5000/api/suitability/top-roles/${activeUserId}`);

      // Save the domain so Dashboard can feature it
      localStorage.setItem("lastAssessedRole", domain);

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to save: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // ── Render helpers ───────────────────────────────────────────────────────
  const StepIndicator = () => (
    <div className="flex items-center gap-2 mb-8">
      {["Role", "Rate", "Quiz", "Results"].map((label, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${i < step ? "bg-emerald-500 text-white"
            : i === step ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-400"
            }`}>
            {i < step ? "✓" : i + 1}
          </div>
          <span className={`ml-1 text-xs font-bold hidden sm:inline ${i === step ? "text-indigo-600" : "text-gray-400"}`}>
            {label}
          </span>
          {i < 3 && <div className={`w-6 h-0.5 mx-2 ${i < step ? "bg-emerald-400" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );

  // ── SUBMITTED ───────────────────────────────────────────────────────────
  if (submitted) {
    const correct = quizScore();
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-8 transition-colors">
        <div className="max-w-md w-full bg-gray-900 rounded-3xl shadow-2xl p-10 text-center border border-gray-800 transition-colors">
          <div className="text-6xl mb-4 text-white">🎉</div>
          <h2 className="text-3xl font-black text-white mb-2">Assessment Complete!</h2>
          <p className="text-gray-400 mb-6">Your results have been saved and your career matches are ready.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-indigo-50 rounded-2xl p-4">
              <div className="text-2xl font-black text-indigo-600">{correct}/{questions.length}</div>
              <div className="text-xs font-bold text-gray-400 mt-1">Quiz Score</div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4">
              <div className="text-2xl font-black text-emerald-600">{Object.values(ratings).filter(v => v > 0).length}</div>
              <div className="text-xs font-bold text-gray-400 mt-1">Skills Rated</div>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
          >
            View My Career Matches →
          </button>
        </div>
      </div>
    );
  }

  // ── STEP 0: Domain Selection ─────────────────────────────────────────────
  if (step === STEP_DOMAIN) {
    return (
      <div className="p-8 max-w-4xl mx-auto min-h-screen bg-gray-950 transition-colors">
        <div className="mb-8 border-b border-gray-800 pb-6 text-center">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Skill <span className="text-indigo-500">Assessment</span></h1>
          <p className="text-gray-400 font-medium">Select your specialization for a tailored evaluation.</p>
        </div>
        <StepIndicator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.keys(DOMAIN_SKILLS).map(role => (
            <button
              key={role}
              onClick={() => handleSelectDomain(role)}
              className="group p-8 bg-gray-900 rounded-[2rem] border-2 border-gray-800 shadow-sm hover:border-indigo-500 hover:shadow-2xl transition-all text-left relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-white text-xl group-hover:text-indigo-400 transition-colors tracking-tight">{role}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">{DOMAIN_SKILLS[role].length} Core Skills &nbsp;·&nbsp; Adaptive Quiz</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all text-xl text-gray-300 shadow-lg">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEP_RATING) {
    const ratedCount = Object.values(ratings).filter(v => v > 0).length;
    return (
      <div className="p-8 max-w-4xl mx-auto bg-gray-950 min-h-screen">
        <div className="mb-6 border-b border-gray-800 pb-5">
          <button onClick={() => setStep(STEP_DOMAIN)} className="text-[10px] font-black text-gray-500 hover:text-indigo-400 uppercase tracking-widest mb-4 transition-all">← Back to roles</button>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-1">Self <span className="text-indigo-500">Inventory</span></h1>
          <p className="text-gray-400 text-lg font-medium">Rate your proficiency in <span className="text-indigo-400 font-black">{domain}</span> skills.</p>
        </div>
        <StepIndicator />
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Rate yourself honestly (0 = no experience, 5 = expert). Slide to 0 to skip a skill.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {skills.map(skill => (
            <div key={skill} className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-800 dark:text-gray-200">{skill}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${ratings[skill] === 0 ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400"
                  : ratings[skill] <= 1 ? "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400"
                    : ratings[skill] <= 2 ? "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      : ratings[skill] <= 3 ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : ratings[skill] <= 4 ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                          : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                  }`}>
                  {["Skip", "Beginner", "Elementary", "Intermediate", "Advanced", "Expert"][ratings[skill]]}
                </span>
              </div>
              <input
                type="range" min="0" max="5"
                value={ratings[skill]}
                onChange={e => setRatings(prev => ({ ...prev, [skill]: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
              />
              <div className="flex justify-between mt-1 text-[10px] font-bold text-gray-300 dark:text-gray-600">
                <span>Skip</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleRatingNext}
          className="w-full bg-indigo-600 text-white font-black py-6 rounded-[1.5rem] hover:bg-indigo-700 transition-all shadow-2xl uppercase tracking-widest text-sm"
        >
          Initialize Evaluation ({ratedCount}/{skills.length} rated) →
        </button>
      </div>
    );
  }

  // ── STEP 3: Quiz ──────────────────────────────────────────────────────────
  if (step === STEP_QUIZ) {
    if (quizLoading) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-2xl shadow-indigo-500/20" />
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Synthesizing Evaluation</h2>
          <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em]">Generating a unique question set for your level...</p>
        </div>
      </div>
    );
    const progress = ((quizIndex + 1) / questions.length) * 100;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
        <div className="max-w-2xl w-full">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">
              <span>Question {quizIndex + 1} of {questions.length}</span>
              <span className="text-indigo-600 dark:text-indigo-400">{domain}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-800 p-10 mb-6 transition-all min-h-[450px] flex flex-col justify-between">
            <div>
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Challenge {quizIndex + 1}</div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-10 leading-snug tracking-tight text-left">
                  {renderText(currentQ?.q || "")}
                </h2>
            </div>
            <div className="space-y-4">
              {currentQ?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${answers[quizIndex] === i
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-500"
                    : "border-gray-100 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:bg-gray-800"
                    }`}
                >
                  <span className={`inline-block w-6 h-6 rounded-full border-2 mr-3 text-center text-xs font-black leading-[20px] align-middle ${answers[quizIndex] === i ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300 dark:border-gray-600"
                    }`}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  <span className="align-middle inline-block w-[calc(100%-40px)] leading-relaxed">
                      {renderText(opt || "")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="flex gap-3">
            {quizIndex > 0 && (
              <button onClick={handlePrevQ} className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 font-bold text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-all">
                ← Back
              </button>
            )}
            <button
              onClick={handleNextQ}
              disabled={answers[quizIndex] === null}
              className="flex-1 bg-indigo-600 text-white font-black py-3 rounded-xl hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all shadow-lg disabled:opacity-40"
            >
              {quizIndex < questions.length - 1 ? "Next Question →" : "See Results →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP 3: Summary ───────────────────────────────────────────────────────
  if (step === STEP_SUMMARY) {
    const correct = quizScore();
    const percent = Math.round((correct / questions.length) * 100);
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="mb-6 border-b dark:border-gray-800 pb-5">
          <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-1">Quiz Complete!</h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Review your answers before submitting.</p>
        </div>

        {/* Score */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl p-5 text-center">
            <div className="text-4xl font-black">{percent}%</div>
            <div className="text-xs font-bold opacity-70 mt-1 uppercase tracking-wider">Quiz Score</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 text-center">
            <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400">{correct}</div>
            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">Correct</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 text-center">
            <div className="text-4xl font-black text-red-500 dark:text-red-400">{questions.length - correct}</div>
            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">Incorrect</div>
          </div>
        </div>

        {/* Answer review */}
        <div className="space-y-3 mb-8">
          {questions.map((q, i) => (
            <div key={i} className={`p-4 rounded-xl border-2 ${answers[i] === q.answer ? "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800" : "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800"}`}>
              <div className="flex items-start gap-3">
                <span className="text-lg">{answers[i] === q.answer ? "✅" : "❌"}</span>
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{q.q}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Your answer: <strong className={answers[i] === q.answer ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}>{q.options[answers[i]]}</strong>
                    {answers[i] !== q.answer && (
                      <> &nbsp;·&nbsp; Correct: <strong className="text-emerald-600 dark:text-emerald-400">{q.options[q.answer]}</strong></>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gray-900 dark:bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl disabled:opacity-50 text-lg"
        >
          {loading ? "Saving & Analyzing..." : "Submit Assessment & See My Career Matches →"}
        </button>
      </div>
    );
  }

  return null;
}

export default SkillAssessment;
