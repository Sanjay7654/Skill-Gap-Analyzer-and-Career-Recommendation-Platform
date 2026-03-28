export const calculateStabilityIndex = (skillVector) => {
    if (!skillVector || skillVector.length === 0) return 0;

    const mean = skillVector.reduce((a, b) => a + b, 0) / skillVector.length;
    const variance = skillVector.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / skillVector.length;

    // Scaling factor: assume max variance is around 6.25 (range 0-5)
    // stability = 100 - (variance * scaling_factor)
    const stability = Math.max(0, 100 - (variance * 15));
    return Math.round(stability);
};