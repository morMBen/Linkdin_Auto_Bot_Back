import express, { Request, Response } from 'express';
import * as userController from '../controllers/user.controller';
import { auth, CustomRequest } from '../middleware/auth';

const Router = express.Router();

Router.get('/healthcheck', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

Router.post('/login', userController.login);

Router.post('/register', userController.register);

Router.get('/my-account', auth, (req: Request, res: Response) =>
  userController.getMyAccount(req as CustomRequest, res)
);

export default Router;
