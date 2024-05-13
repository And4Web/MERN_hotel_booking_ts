import { NextFunction, Request, Response } from "express";

export type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}