export const calculateGrowth = (currentLevel, practiceHours, growthRate = 0.1) => {
    const newLevel = currentLevel + (practiceHours * growthRate);
    return Math.min(5, newLevel); // Max level is 5
};

export const calculateDecay = (currentLevel, monthsInactive, decayRate = 0.05) => {
    const newLevel = currentLevel - (monthsInactive * decayRate);
    return Math.max(0, newLevel); // Min level is 0
};