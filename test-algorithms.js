
import { normalizeScore, validateQuizScore, calculateConfidenceScore } from './server/utils/scoreCalculator.js';
import { calculateSuitability } from './server/services/skillgapEngine.js';
import { calculateStabilityIndex } from './server/services/stabilityEngine.js';
import { calculateCareerRiskIndex } from './server/services/riskEngine.js';

console.log("--- SkillGap Algorithm Verification ---");

// 1. Normalization
const raw = 3.5;
const normalized = normalizeScore(raw, 5);
console.log(`1. Normalization (3.5/5): ${normalized} (Expected: 3.5)`);

// 2. Validation
const self = 4;
const quiz = 3;
const validated = validateQuizScore(self, quiz);
console.log(`2. Validated Score (S:4, Q:3): ${validated} (Expected: ${Math.round((4 * 0.6 + 3 * 0.4) * 100) / 100})`);

// 3. Stability
const skills = [4, 4, 3, 5, 4];
const stability = calculateStabilityIndex(skills);
console.log(`3. Stability Index (Balanced): ${stability}%`);

const unstable = [5, 1, 5, 0, 4];
const instability = calculateStabilityIndex(unstable);
console.log(`   Stability Index (Volatile): ${instability}%`);

// 4. Risk
const risk = calculateCareerRiskIndex(20, 100 - stability, 10);
console.log(`4. Career Risk Index: ${risk}%`);

// 5. SkillGap
const finalScore = calculateSuitability({
    skillGapPercentage: 15,
    stabilityScore: stability,
    confidenceScore: 90,
    learningAdaptability: 80,
    riskIndex: risk
});
console.log(`5. Final SkillGap Suitability Score: ${finalScore}%`);

console.log("--- Verification Complete ---");
