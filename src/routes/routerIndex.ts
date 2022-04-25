import express, { Request, Response } from 'express';
import ProfileRoutes from './profile.routes';
import CrawlerRoutes from './scraper.routes';
import SearchRoutes from './search.routes';
import UserRoutes from './user.routes';
import { auth } from '../middleware/auth';

const router = express.Router();
router.get('/healthcheck', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

router.use('/profile', auth, ProfileRoutes);
router.use('/crawler', auth, CrawlerRoutes);
router.use('/search', auth, SearchRoutes);
router.use('/user', UserRoutes);

export default router;
