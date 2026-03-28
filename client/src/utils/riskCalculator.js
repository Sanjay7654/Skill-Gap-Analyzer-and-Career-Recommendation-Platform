export const calculateRiskIndex = (skillGap, instability, confidenceMismatch) => {
    return (0.5 * skillGap) + (0.3 * instability) + (0.2 * confidenceMismatch);
};

export const getRiskLabel = (risk) => {
    if (risk < 25) return "Low";
    if (risk < 60) return "Moderate";
    return "High";
};