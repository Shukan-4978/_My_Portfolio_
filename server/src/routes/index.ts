import { Router } from 'express';
import authRoutes from './auth';
import projectRoutes from './projects';
import skillRoutes from './skills';
import experienceRoutes from './experience';
import certificateRoutes from './certificates';
import achievementRoutes from './achievements';
import blogRoutes from './blogs';

import messageRoutes from './messages';
import portfolioDataRoutes from './portfolioData';
import visitorRoutes from './visitors';
import uploadRoutes from './upload';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Mount all routes
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/certificates', certificateRoutes);
router.use('/achievements', achievementRoutes);
router.use('/blogs', blogRoutes);

router.use('/messages', messageRoutes);
router.use('/portfolio', portfolioDataRoutes);
router.use('/visitors', visitorRoutes);
router.use('/upload', uploadRoutes);

export default router;
