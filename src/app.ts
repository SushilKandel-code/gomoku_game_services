import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './utils/connectDB';


dotenv.config();
  //connect to database
  connectDB();