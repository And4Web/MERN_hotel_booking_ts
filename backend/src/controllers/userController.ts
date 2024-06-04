import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import ErrorHandler from "../utils/errorHandler";

// @function - get all Users
// @route - /api/v1/users/all
// @access - admin only
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({}).select("_id firstName lastName email");

    return res
      .status(200)
      .json({ success: true, message: "list of all users", allUsers });
  } catch (error) {
    console.log(error);
  }
};

// @function - create new User
// @route - /api/v1/users/register
// @access - public
export const createNewUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsList = errors.array().map((e) => e.msg);

    return res.status(400).json({ success: false, message: errorsList });
  }

  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user)
      return res
        .status(400)
        .json({ message: "User already exists. Please sign in." });

    user = new User(req.body);

    await user.save();

    const token = jwt.sign(
      {
        userId: user.id,
        userName: user.firstName,
        userEmail: user.email,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res
      .status(200)
      .json({ success: true, message: "New user created", user: user.email });
  } catch (error) {
    console.log("Error in user route, can't create new user >>> ", error);
    return res
      .status(500)
      .json({
        success: false,
        message: `Something went wrong, Error > ${error}`,
      });
  }
};

// @function - get the logged in User
// @route - /api/v1/users/me
// @access - logged in user
export const getLoggedinUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    
    const user = await User.findById(userId).select("email firstName lastName _id");
    if(!user) return res.status(404).json({success: false, message: "User not found"});

    return res.status(200).json({success: true, message: "User details", user});

  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Error", error});
  }
};
