import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import gapRoutes from './routes/gapRoutes.js';
import skillGapRoutes from './routes/skillGapRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import suitabilityRoutes from './routes/suitabilityRoutes.js';
import riskRoutes from './routes/riskRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import stabilityRoutes from './routes/stabilityRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/gap', gapRoutes);
app.use('/api/skill-gap', skillGapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/suitability', suitabilityRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/stability', stabilityRoutes);
app.use('/api/ai', aiRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

export default app;
