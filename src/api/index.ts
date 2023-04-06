import express from 'express';
import userRoutes from './user/user.routes';
import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import { authMiddleware } from '../middlewares';
import cattleRoutes from './cattle/cattle.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/users', userRoutes);

// user auth middleware for /admin routes
router.use('/cattles', authMiddleware, cattleRoutes);



export default router;
