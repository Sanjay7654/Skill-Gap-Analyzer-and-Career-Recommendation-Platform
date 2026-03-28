export const calculateSuitability = ({
    skillMatch,
    stability,
    confidenceScore,
    interestMatch = 100,
    learningSpeed = 100
}) => {
    return (0.3 * skillMatch) +
        (0.2 * stability) +
        (0.2 * confidenceScore) +
        (0.2 * interestMatch) +
        (0.1 * learningSpeed);
};