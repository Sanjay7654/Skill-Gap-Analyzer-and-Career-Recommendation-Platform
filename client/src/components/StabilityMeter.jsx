
function StabilityMeter({ score }) {
    const getLevel = (s) => {
        if (s > 80) return "Optimal";
        if (s > 50) return "Balanced";
        return "Volatile";
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Profile Stability</span>
                <span className="text-xs font-bold text-gray-600">{getLevel(score)}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000 ease-out"
                    style={{ width: `${score}%` }}
                />
            </div>
            <div className="flex justify-between text-[8px] font-bold text-gray-400">
                <span>FRAGILE</span>
                <span>{score}%</span>
                <span>STABLE</span>
            </div>
        </div>
    );
}

export default StabilityMeter;