import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from "morgan";

import errorMiddleware from "./middleware/error";

// import all routers
import authRoutes from './routers/authRoutes';
import userRoutes from './routers/userRoutes';
import path from 'path';

mongoose.connect(process.env.MONGODB_LOCAL_URI as string).then(()=>{console.log('mongodb database connected successfully >>> ', process.env.MONGODB_LOCAL_URI)}).catch(e=>console.log('Error connecting to mongodb >>> ', e));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'))

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.get("/api/v1/test", async(req: Request, res: Response)=>{
  return res.json({message: "test route"})
})

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

// custom error handling middleware
app.use(errorMiddleware)

app.listen(7000, ()=>{
  console.log("Server listening at 7000.")
})