// Learning Score = (Past Learning Rate + Practice Frequency) / 2

export const calculateLearningAdaptability = (pastLearningRate, practiceFrequency) => {
    // pastLearningRate: 0-100 (based on skill improvement)
    // practiceFrequency: 0-100 (based on session density)
    return (pastLearningRate + practiceFrequency) / 2;
};

export const predictTimeToReady = (gap, speed) => {
    if (speed <= 0) return Infinity;
    // Assuming gap is 0-100 and speed is points per week
    return Math.ceil(gap / speed);
};

export const calculateLearningSpeed = (currentScore, previousScore, timePeriodInWeeks) => {
    if (timePeriodInWeeks === 0) return 0;
    return (currentScore - previousScore) / timePeriodInWeeks;
};
