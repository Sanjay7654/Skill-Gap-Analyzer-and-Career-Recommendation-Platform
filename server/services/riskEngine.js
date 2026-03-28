export const calculateCareerRiskIndex = (skillGapPercentage, instabilityScore, confidenceMismatch) => {
    // RiskIndex = (0.5 * skill_gap) + (0.3 * instability) + (0.2 * confidence_mismatch)
    const riskIndex = (0.5 * skillGapPercentage) + (0.3 * instabilityScore) + (0.2 * confidenceMismatch);
    return Math.max(0, Math.min(100, Math.round(riskIndex * 100) / 100));
};

export const getRiskLabel = (riskIndex) => {
    if (riskIndex > 60) return "High";
    if (riskIndex > 30) return "Moderate";
    return "Low";
};
