export const calculateGrowth = (oldSkill, practiceHours, growthRate = 0.05) => {
    // newSkill = oldSkill + (practiceHours * growthRate)
    const newSkill = oldSkill + (practiceHours * growthRate);
    return Math.min(5, Math.max(0, Math.round(newSkill * 100) / 100)); // cap at max score 5
};

export const calculateDecay = (oldSkill, monthsInactive, decayRate = 0.1) => {
    // newSkill = oldSkill - (decayRate * monthsInactive)
    const newSkill = oldSkill - (decayRate * monthsInactive);
    return Math.max(0, Math.round(newSkill * 100) / 100); // min score at 0
};
