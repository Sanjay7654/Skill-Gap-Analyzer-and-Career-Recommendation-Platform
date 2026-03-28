import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import RiskIndicator from "../components/RiskIndicator";
import StabilityMeter from "../components/StabilityMeter";
import ConfidenceAlert from "../components/ConfidenceAlert";

function GapAnalysis() {
  const { roleId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const activeUserId = userId || localStorage.getItem("userId");
      if (!activeUserId || !roleId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/skill-gap/${activeUserId}/${roleId}`);
        setData(res.data.data);
      } catch (err) {
        console.error("Gap analysis error:", err);
        setError(err.response?.data?.error || "Failed to load analysis. Please complete your skill assessment first.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, roleId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-bold text-gray-500 text-sm tracking-widest uppercase">Analyzing your gaps...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-10 max-w-2xl mx-auto text-center">
      <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
        <p className="text-red-600 font-bold mb-4">{error}</p>
        <button
          onClick={() => navigate("/assessment")}
          className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all"
        >
          Go to Skill Assessment
        </button>
      </div>
    </div>
  );

  if (!data) return null;

  const matchPercent = data.suitabilityScore != null
    ? Math.round(data.suitabilityScore)
    : null;

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-gray-950 transition-colors">
      {/* Header */}
      <div className="mb-12 border-b border-gray-800 pb-10 flex items-start justify-between">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-[10px] text-gray-500 hover:text-indigo-400 mb-6 flex items-center gap-1 font-black uppercase tracking-widest transition-all"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4">
            Skill Gap <span className="text-indigo-500">Analysis</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            Detailed breakdown powered by the SkillGap Analyzer engine.
          </p>
        </div>
        {matchPercent != null && (
          <div className="text-center bg-indigo-600 text-white px-10 py-6 rounded-[2rem] shadow-2xl">
            <div className="text-5xl font-black">{matchPercent}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-80">Suitability</div>
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <RiskIndicator riskIndex={data.riskIndex || 0} />
        <StabilityMeter score={data.stabilityScore || 0} />
        <ConfidenceAlert confidenceScore={data.confidenceScore || 0} />
      </div>

      {/* Skill Details Table */}
      <div className="bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-800 overflow-hidden mb-12">
        <div className="px-10 py-8 bg-indigo-600/10 border-b border-gray-800 flex justify-between items-center">
          <h2 className="font-black text-2xl text-white">Skills Breakdown</h2>
          <span className="text-indigo-400 text-xs font-black uppercase tracking-widest bg-indigo-900/40 px-4 py-1.5 rounded-full">
            {data.gapDetails?.filter(s => s.gapPercent === 0).length || 0} / {data.gapDetails?.length || 0} Core Competencies Met
          </span>
        </div>
        <div className="p-10 space-y-6">
          {data.gapDetails && data.gapDetails.length > 0 ? (
            data.gapDetails.map((skill, index) => (
              <div key={index} className="p-8 rounded-3xl bg-gray-800/50 hover:bg-gray-800 border-2 border-transparent hover:border-indigo-500/20 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-black text-gray-100 text-xl tracking-tight">{skill.skill}</span>
                  <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${skill.gapPercent > 0 ? 'bg-red-900/20 text-red-400' : 'bg-emerald-900/20 text-emerald-400'
                    }`}>
                    {skill.gapPercent > 0 ? `${Math.round(skill.gapPercent)}% Gap` : "✓ Meets Requirements"}
                  </span>
                </div>
                <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                  <span>Current: <strong className="text-indigo-400">{skill.actual}/5</strong></span>
                  <span>Target: <strong className="text-gray-300">{skill.required}/5</strong></span>
                </div>
                <div className="relative w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-800">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${skill.gapPercent > 0 ? 'bg-indigo-600' : 'bg-emerald-500'}`}
                    style={{ width: `${(Math.min(skill.actual, 5) / 5) * 100}%` }}
                  />
                  <div
                    className={`absolute top-0 bottom-0 w-1 ${skill.gapPercent > 0 ? 'bg-red-500/50' : 'bg-emerald-500/20'}`}
                    style={{ left: `calc(${(skill.required / 5) * 100}% - 4px)` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 font-bold py-12">No skill data available. Complete your assessment first.</p>
          )}
        </div>
      </div>

      {/* Inline Roadmap & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

        {/* Roadmap Module */}
        <div className="bg-gray-900 rounded-[2rem] p-10 border border-gray-800 shadow-2xl">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-10 bg-indigo-600 rounded-full" />
            Learning Roadmap
          </h2>
          {data.roadmap && data.roadmap.length > 0 ? (
            <div className="space-y-8">
              {data.roadmap.map((step, idx) => (
                <div key={idx} className="flex gap-6 group relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black text-base shrink-0 border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                      {idx + 1}
                    </div>
                    {idx < data.roadmap.length - 1 && <div className="w-0.5 bg-gray-800 absolute top-10 bottom-0 left-1/2 -translate-x-1/2" />}
                  </div>
                  <div className="pb-4 w-full">
                    <h3 className="font-black text-gray-100 text-lg group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{step.skill}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-emerald-400 font-black bg-emerald-900/20 p-6 rounded-2xl border border-emerald-500/20 text-center uppercase tracking-widest">All requirements met!</p>
          )}
        </div>

        {/* Resources Module */}
        <div className="bg-gray-900 rounded-[2rem] p-10 border border-gray-800 shadow-2xl flex flex-col max-h-[800px]">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 shrink-0">
            <span className="w-2 h-10 bg-emerald-500 rounded-full" />
            Curated Resources
          </h2>
          <div className="space-y-4 overflow-y-auto pr-4 custom-scrollbar flex-1">
            {data.resources && data.resources.length > 0 ? (
              data.resources.map((res, i) => (
                <a key={i} href={res.link} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/50 hover:bg-gray-800 transition-all group relative overflow-hidden bg-gray-900/50 shadow-lg">
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${res.difficulty === 'Beginner' ? 'bg-emerald-500' : res.difficulty === 'Intermediate' ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <div className="pl-4">
                    <h4 className="font-black text-gray-100 text-base mb-2 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{res.title}</h4>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{res.skill_name}</span>
                      <div className="flex gap-3 shrink-0">
                        <span className="text-[10px] uppercase font-black tracking-widest bg-gray-800 text-gray-400 px-3 py-1 rounded-lg border border-gray-700">{res.resource_type || 'Article'}</span>
                        <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-sm text-gray-500 font-black text-center py-12 uppercase tracking-widest">Resources will unlock post-gap detection.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default GapAnalysis;
