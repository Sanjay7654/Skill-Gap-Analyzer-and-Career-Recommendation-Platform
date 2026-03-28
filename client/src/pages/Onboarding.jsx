import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const DOMAINS = [
  "Web Development",
  "Software Engineering",
  "Data Science",
  "Cloud Computing",
  "Cybersecurity",
];

function Onboarding() {
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const activeUserId = userId || localStorage.getItem("userId");
    if (!activeUserId || activeUserId === "null") return navigate("/login");
    if (!experience || !domain) return alert("Please fill in all fields.");

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/profile", {
        user_id: activeUserId,
        education,
        experience_level: experience,
        preferred_domain: domain
      });
      navigate("/assessment");
    } catch (err) {
      console.error("Profile error:", err);
      alert("Failed to save profile: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 transition-colors">
      <div className="max-w-lg w-full p-10 bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 transition-colors">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Set Up Your Profile
          </h1>
          <p className="text-gray-400 text-sm">
            Tell us about your background so SkillGap Analyzer can personalize your career analysis.
          </p>
        </div>

        <div className="space-y-6">
          {/* Education */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
              Education Background
            </label>
            <input
              type="text"
              className="w-full bg-gray-950 border border-gray-800 dark:text-white rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. B.Tech in Computer Science"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
              Experience Level <span className="text-red-400">*</span>
            </label>
            <select
              className="w-full bg-gray-950 border border-gray-800 dark:text-white rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="">Select your level</option>
              <option value="Beginner">Beginner / Student</option>
              <option value="Intermediate">Intermediate (1–3 years)</option>
              <option value="Advanced">Advanced (3–5 years)</option>
              <option value="Expert">Expert / Senior (5+ years)</option>
            </select>
          </div>

          {/* Target Domain */}
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
              Target Domain <span className="text-red-400">*</span>
            </label>
            <select
              className="w-full bg-gray-950 border border-gray-800 dark:text-white rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <option value="">Select your target field</option>
              {DOMAINS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 text-base"
          >
            {loading ? "Saving Profile..." : "Continue to Skill Assessment →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
