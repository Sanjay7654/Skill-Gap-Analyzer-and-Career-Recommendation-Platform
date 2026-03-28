export const calculateVariance = (skillVector) => {
    if (!skillVector || skillVector.length === 0) return 0;
    const mean = skillVector.reduce((sum, val) => sum + val, 0) / skillVector.length;
    const variance = skillVector.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / skillVector.length;
    return variance;
};

export const calculateStabilityIndex = (skillVector, scalingFactor = 10) => {
    const variance = calculateVariance(skillVector);
    let stability = 100 - (variance * scalingFactor);
    return Math.max(0, Math.min(100, Math.round(stability * 100) / 100));
};
