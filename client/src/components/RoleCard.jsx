import { useNavigate } from "react-router-dom";

function RoleCard({ role }) {
  const navigate = useNavigate();
  if (!role) return null;

  return (
    <div 
      onClick={() => navigate(`/gap/${role.roleId}`)}
      className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 border border-gray-100 dark:border-gray-700 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer group"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xs">S</div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{role.roleTitle}</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{Math.round(role.suitabilityScore)}%</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-indigo-400/50">Suitability</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
          <span>Alignment Index</span>
          <span>{Math.round(role.suitabilityScore)}%</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-1000"
            style={{ width: `${role.suitabilityScore}%` }}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
         <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">Explore Full Gap Analysis →</span>
      </div>
    </div>
  );
}

export default RoleCard;
