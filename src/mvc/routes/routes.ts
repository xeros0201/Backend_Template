import { Express } from 'express';
 
 
import { authRouter, userRouter } from './v1';

export default (app: Express) => {
  app.use('/v1', authRouter );
  app.use('/v1', userRouter);
  //user
};
