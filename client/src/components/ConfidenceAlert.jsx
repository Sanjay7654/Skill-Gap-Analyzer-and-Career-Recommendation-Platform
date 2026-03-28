
function ConfidenceAlert({ confidenceScore }) {
    const getStatus = (score) => {
        if (score > 85) return { label: "High Calibration", msg: "Your self-assessment matches your performance.", color: "text-emerald-700", icon: "🎯" };
        if (score > 60) return { label: "Misaligned", msg: "Minor gap between perceived and actual skills.", color: "text-amber-700", icon: "⚖️" };
        return { label: "Low Calibration", msg: "Significant divergence detected in skill validation.", color: "text-red-700", icon: "🔬" };
    };

    const { label, msg, color, icon } = getStatus(confidenceScore);

    return (
        <div className={`p-4 rounded-2xl flex gap-4 bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md ${color}`}>
            <span className="text-2xl pt-1">{icon}</span>
            <div>
                <h4 className="font-black text-sm uppercase tracking-tight">{label}</h4>
                <p className="text-xs opacity-80 font-medium leading-relaxed">{msg}</p>
            </div>
        </div>
    );
}

export default ConfidenceAlert;