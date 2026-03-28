/**
 * Calculates final suitability score based on 5 dimensions for SkillGap Analyzer.
 */
export const calculateSuitability = (params) => {
    const {
        skillGapPercentage,     // 0-100 (from Gap calculation)
        stabilityScore,         // 0-100 (from SSAM)
        confidenceScore,        // 0-100 (from CCVM)
        learningAdaptability,   // 0-100 (from ALSP mapped to score)
        riskIndex               // 0-100 (from CREM)
    } = params;

    // 1. Skill Match Score (SMS)
    const skillMatch = Math.max(0, 100 - skillGapPercentage);

    // 2. Skill Stability Index (SSI) -> stabilityScore is already 0-100
    // 3. Confidence Reliability Score (CRS) -> confidenceScore is already 0-100
    // 4. Learning Adaptability Score (LAS) -> learningAdaptability is already 0-100

    // 5. Adjusted Career Risk Score (CRSK)
    const adjustedRiskScore = Math.max(0, 100 - riskIndex);

    // 6. SkillGap Final Suitability Formula (High-Precision Differentiation)
    // We apply a non-linear decay to skillMatch to ensure irrelevant roles result in 0% score
    const sensitivity = 2.0; 
    const dynamicSkillMatch = Math.pow(skillMatch / 100, sensitivity) * 100;

    // Scale global potentials by the match ratio so irrelevant roles don't get "boosted"
    const reachFactor = dynamicSkillMatch / 100;

    let suitabilityScore =
        (0.85 * dynamicSkillMatch) + 
        (reachFactor * (0.05 * stabilityScore + 0.05 * confidenceScore + 0.05 * learningAdaptability));

    return Math.max(0, Math.min(100, Math.round(suitabilityScore * 100) / 100));
};
