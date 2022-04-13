import express, { Request, Response } from 'express';
import * as searchController from '../controllers/search.controller';

const Router = express.Router();

Router.get('/healthcheck', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

Router.get('/all', searchController.getAll);
Router.post('/', searchController.addOne);
Router.delete('/:id', searchController.deleteOne);

export default Router;
