import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

// change the Request type coming from Express to add one more property userId in Request type (extending a type):

declare global{
  namespace Express{
    interface Request{
      userId: string;
    }
  }
}

const verifyToken = (req:Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if(!token){
    return res.status(401).json({success: false, message: "Unauthorized"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({success: false, message: "Unauthorized"})
  }
}

export default verifyToken;