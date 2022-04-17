import express, { Request, Response } from 'express';
import ProfileRoutes from './profile.routes';
import CrawlerRoutes from './scraper.routes';
import SearchRoutes from './search.routes';
import UserRoutes from './user.routes';

const router = express.Router();
router.get('/healthcheck', (req: Request, res: Response) => {
  return res.sendStatus(200);
});

router.use('/profile', ProfileRoutes);
router.use('/crawler', CrawlerRoutes);
router.use('/search', SearchRoutes);
router.use('/user', UserRoutes);

export default router;
