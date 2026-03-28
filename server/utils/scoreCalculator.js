export const normalizeScore = (rawScore, maxScore) => {
    // normalized_score = (raw_score / max_score) * 5
    if (maxScore === 0) return 0;
    const normalized = (rawScore / maxScore) * 5;
    return Math.max(0, Math.min(5, Math.round(normalized * 100) / 100));
};

export const validateQuizScore = (selfRating, quizScore) => {
    // final_skill_score = (self_rating*0.6) + (quiz_score*0.4)
    const finalScore = (selfRating * 0.6) + (quizScore * 0.4);
    return Math.max(0, Math.min(5, Math.round(finalScore * 100) / 100));
};

export const calculateConfidenceGap = (selfRating, quizScore) => {
    // confidence_gap = abs(self_rating - quiz_score)
    return Math.abs(selfRating - quizScore);
};

export const calculateConfidenceScore = (confidenceGap, maxPossibleGap = 5) => {
    // Converts a gap (e.g. 0-5) into a 0-100 score
    const penalty = (confidenceGap / maxPossibleGap) * 100;
    return Math.max(0, Math.round(100 - penalty));
};
