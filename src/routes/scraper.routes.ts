import express, { Request, Response } from 'express';
import { scraperInit } from '../controllers/scraper.controller';

const Router = express.Router();

Router.get('/healthcheck', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

Router.post('/', scraperInit);

export default Router;
