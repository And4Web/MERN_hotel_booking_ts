import {Request, Response, NextFunction} from 'express';
import ErrorHandler from '../src/utils/errorHandler';


const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = "Undefined Error or Bad Request or Internal Server Error";
  err.statusCode = 500;

  if(err.name === "CastError") err.message = "Invalid ID";

  return res.status(err.statusCode).json({success: false, message: `Error: ${err.message}`});
}

export default errorMiddleware;