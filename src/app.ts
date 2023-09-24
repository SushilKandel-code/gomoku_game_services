import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './utils/connectDB'
import authHandler from './handler/authHandler';


dotenv.config();
//  Connect to database.
connectDB();
const app: Express = express();
const port = 5050;
app.use(express.json());

app.use('api/auth', authHandler);


mongoose.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
  })