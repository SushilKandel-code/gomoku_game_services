import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './utils/connectDB'
import authHandler from './handler/authHandler';
import gameHandler from './handler/gameHandler';
import { env } from 'process';


dotenv.config();
//  Connect to database.
connectDB();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/api/auth', authHandler);
app.use('/api/games', gameHandler);


mongoose.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
  })