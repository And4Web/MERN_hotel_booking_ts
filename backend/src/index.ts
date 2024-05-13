import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import errorMiddleware from '../middleware/error';

mongoose.connect(process.env.MONGODB_LOCAL_URI as string).then(()=>{console.log('mongodb database connected successfully.')}).catch(e=>console.log('Error connecting to mongodb >>> ', e));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get("/api/test", async(req: Request, res: Response)=>{
  return res.json({message: "test route"})
})


// custom error handling middleware
app.use(errorMiddleware)

app.listen(7000, ()=>{
  console.log("Server listening at 7000.")
})