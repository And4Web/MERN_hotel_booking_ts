import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/user";

// @function - 
// @route - /api/v1/auth/sign-in
// @access - public
export const userLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    const errorList = errors.array().map(e=>e.msg);
    console.log(errorList);

    return res.status(400).json({success: false, message: "Invalid credentials.", errors: errorList})
  }
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});

    if(!user) return res.status(400).json({success: false, message: "Invalid credentials."});

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) return res.status(404).json({success: false, message: "invalid credentials."})

    const token = jwt.sign({
      userId: user.id,
      userName: user.firstName,
      userEmail: user.email
    }, process.env.JWT_SECRET_KEY as string, {expiresIn: "1h"});

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000
    })
    
    return res.status(200).json({success: true, message: "Logged in", userId: user._id});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Something went wrong", error})
  }
}