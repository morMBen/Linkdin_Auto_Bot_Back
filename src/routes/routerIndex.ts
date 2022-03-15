import express, { Request, Response } from 'express';
import ProfileRoutes from './profile.routes';

const router = express.Router();
router.get('/healthcheck', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

router.use('/profile', ProfileRoutes);

export default router;
