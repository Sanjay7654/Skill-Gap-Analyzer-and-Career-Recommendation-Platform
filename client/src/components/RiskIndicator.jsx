
function RiskIndicator({ riskIndex }) {
    const getRiskDetails = (index) => {
        if (index > 60) return { label: "High Risk", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: "⚠️" };
        if (index > 30) return { label: "Moderate Risk", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: "⚡" };
        return { label: "Low Risk", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: "✅" };
    };

    const { label, color, bg, border, icon } = getRiskDetails(riskIndex);

    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${bg} ${border} ${color} transition-all duration-300 hover:scale-105`}>
            <span className="text-lg">{icon}</span>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-70">Career Risk</span>
                <span className="text-sm font-bold leading-tight">{label} ({riskIndex}%)</span>
            </div>
        </div>
    );
}

export default RiskIndicator;