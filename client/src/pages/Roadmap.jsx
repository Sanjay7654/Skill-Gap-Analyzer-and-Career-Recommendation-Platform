import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const STATUS_STYLES = {
  "completed": { dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", label: "Completed" },
  "in-progress": { dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700", label: "In Progress" },
  "not-started": { dot: "bg-gray-300", badge: "bg-gray-100 text-gray-500", label: "Not Started" }
};

function Roadmap() {
  const { roleId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const activeUserId = userId || localStorage.getItem("userId");
      try {
        let res;
        if (roleId) {
          // Specific role roadmap (from GapAnalysis page)
          res = await axios.get(`http://localhost:5000/api/roadmap/role/${roleId}`);
          // Also get user skills to mark progress
          const skillRes = await axios.get(
            `http://localhost:5000/api/skill-gap/${activeUserId}/${roleId}`
          ).catch(() => null);

          const userSkillMap = {};
          if (skillRes && skillRes.data?.data?.gapDetails) {
            skillRes.data.data.gapDetails.forEach(s => {
              userSkillMap[s.skill] = s.actual;
            });
          }

          const roadmapWithStatus = res.data.data.roadmap.map(step => {
            const level = userSkillMap[step.skill_name] || 0;
            return {
              ...step,
              userLevel: level,
              status: level >= 3 ? "completed" : level > 0 ? "in-progress" : "not-started"
            };
          });

          setData({ ...res.data.data, role: res.data.data.role, roadmap: roadmapWithStatus });
        } else {
          // User's best-match roadmap (no roleId)
          res = await axios.get(`http://localhost:5000/api/roadmap/user/${activeUserId}`);
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Roadmap error:", err);
        setError("Could not load roadmap. Please complete your assessment first.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, roleId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-bold text-gray-400 text-sm">Loading your roadmap...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-10 max-w-2xl mx-auto text-center">
      <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
        <p className="text-red-600 font-bold mb-4">{error}</p>
        <button onClick={() => navigate("/assessment")}
          className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all">
          Go to Assessment
        </button>
      </div>
    </div>
  );

  if (!data) return null;

  const roleName = data.role?.career_name || data.roleName || "Your Career";
  const domain = data.role?.domain || data.domain || "";
  const completed = data.roadmap?.filter(s => s.status === "completed").length || 0;
  const total = data.roadmap?.length || 0;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b pb-6">
        <button onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-400 hover:text-indigo-600 mb-3 flex items-center gap-1 font-bold transition-colors">
          ← Back to Dashboard
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-1">Learning Roadmap</h1>
            <p className="text-indigo-600 font-bold text-lg">{roleName}</p>
            {domain && <p className="text-gray-400 text-sm mt-1">{domain}</p>}
          </div>
          {/* Progress ring */}
          <div className="text-center bg-white border border-gray-100 shadow-lg rounded-2xl px-6 py-4">
            <div className="text-3xl font-black text-indigo-600">{completed}/{total}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Steps Done</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 bg-gray-100 rounded-full h-2">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all duration-700"
              style={{ width: total > 0 ? `${(completed / total) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-sm font-bold text-gray-500">{total > 0 ? Math.round((completed / total) * 100) : 0}%</span>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100" />

        <div className="space-y-6">
          {data.roadmap && data.roadmap.map((step, index) => {
            const s = STATUS_STYLES[step.status] || STATUS_STYLES["not-started"];
            return (
              <div key={index} className="flex gap-8 items-start relative">
                {/* Step dot */}
                <div className={`relative z-10 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center font-black text-xs text-white ${s.dot}`}>
                  {step.status === "completed" ? "✓" : step.step_number || index + 1}
                </div>

                {/* Card */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-gray-800 text-lg">{step.skill_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${s.badge}`}>{s.label}</span>
                  </div>
                  {step.description && (
                    <p className="text-gray-500 text-sm mb-3">{step.description}</p>
                  )}
                  {step.userLevel > 0 && (
                    <p className="text-xs text-gray-400 font-bold">Your current level: {step.userLevel}/5</p>
                  )}

                  {/* Resources */}
                  {step.resources && step.resources.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.resources.map((res, ri) => (
                        <a key={ri} href={res.link} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors">
                          📖 {res.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
