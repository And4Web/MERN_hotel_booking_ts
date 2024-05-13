import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types";

const tryCatch = (controllerFunc: ControllerType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.resolve(controllerFunc(req, res, next)).catch(err=>next(err))
  }
}


export default tryCatch;