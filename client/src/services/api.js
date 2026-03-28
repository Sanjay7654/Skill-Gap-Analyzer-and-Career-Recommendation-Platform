import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// ── Auth ─────────────────────────────────────────────────────────────────────
export const loginUser = (data) => api.post('/users/login', data);
export const signupUser = (data) => api.post('/users/signup', data);
export const saveProfile = (data) => api.post('/users/profile', data);

// ── Assessment ────────────────────────────────────────────────────────────────
export const saveAssessment = (userId, skills) =>
  api.post('/gap/assess', { userId, skills });

// ── Suitability / Dashboard ───────────────────────────────────────────────────
export const getTopRoles = (userId) =>
  api.get(`/suitability/top-roles/${userId}`);

// ── Skill Gap ─────────────────────────────────────────────────────────────────
export const getSkillGap = (userId, roleId) =>
  api.get(`/skill-gap/${userId}/${roleId}`);

// ── Roadmap ───────────────────────────────────────────────────────────────────
export const getRoadmapForUser = (userId) => api.get(`/roadmap/user/${userId}`);
export const getRoadmapForRole = (roleId) => api.get(`/roadmap/role/${roleId}`);
export const getAllCareerRoles = () => api.get('/roadmap/all-roles');

// ── Resources (from learning_resources table) ─────────────────────────────────
export const getResourcesBySkill = (skillName) =>
  api.get(`/gap/resources?skill=${encodeURIComponent(skillName)}`);

// ── Stability ─────────────────────────────────────────────────────────────────
export const getStability = (userId) => api.get(`/stability/${userId}`);
export const getStabilityHistory = (userId) => api.get(`/stability/history/${userId}`);

// ── Risk ──────────────────────────────────────────────────────────────────────
export const getRisk = (userId, roleId) => api.get(`/risk/${userId}/${roleId}`);
export const getAllRisks = (userId) => api.get(`/risk/${userId}`);

// ── Progress ──────────────────────────────────────────────────────────────────
export const getProgress = (userId) => api.get(`/progress/evolution/${userId}`);

export default api;
