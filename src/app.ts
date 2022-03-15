import express, { Express, Request, Response, NextFunction } from 'express';
import { connectDb } from './database/connect';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsConfig } from '../config';
import router from './routes/routerIndex';

const app: Express = express();
connectDb();

app.use(cors(corsConfig));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err) return res.status(err.status).send(err)

  return next(req); 
});

app.use('/api', router);

app.use(((req: Request, res: Response, next: any) => {
  res.status(404).send('Page Not Found');
})); //as express.ErrorRequestHandler);

export { app };
