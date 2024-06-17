import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

import errorMiddleware from "./middleware/error";

// import all routers
import authRoutes from './routers/authRoutes';
import userRoutes from './routers/userRoutes';
import hotelsRoutes from './routers/hotelsRoutes';
import searchRoutes from './routers/searchRoutes';
import myBookingsRoutes from './routers/myBookings';

// mongoose.connect(process.env.MONGODB_DRIVER_URI as string).then(()=>{console.log('mongodb database connected successfully >>> ', process.env.MONGODB_DRIVER_URI)}).catch(e=>console.log('Error connecting to mongodb >>> ', e));

// for test only
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
  
  return res.json({message: "test route", rootPath: path.join(__dirname)})
})

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/hotels', hotelsRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/my-bookings', myBookingsRoutes);

// Catch all routes
app.get("*", (req:Request, res:Response)=>{
  return res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
})


// custom error handling middleware
app.use(errorMiddleware)

app.listen(7000, ()=>{
  console.log("Server listening at 7000.")
})