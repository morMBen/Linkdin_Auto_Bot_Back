import express, { Request, Response } from 'express';
import * as userController from '../controllers/user.controller';
import { auth } from '../middleware/auth';

const Router = express.Router();

Router.get('/healthcheck', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

Router.post('/login', userController.loginOne);
Router.post('/register', userController.registerOne);
//get or post route? data passed via body
Router.get('/my-account', auth, userController.getMyAccount);

export default Router;
