import {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

// @function - get all Users
// @route - /api/v1/users/all
// @access - admin only 
export const getAllUsers = async (req: Request, res: Response)=>{
  try {
    const allUsers = await User.find({}).select("_id firstName lastName email");

  return res.status(200).json({success: true, message: "list of all users", allUsers});
  } catch (error) {
    console.log(error);
  }  
}


// @function - create new User
// @route - /api/v1/users/register
// @access - public
export const createNewUser = async(req: Request, res: Response)=>{
  try {
    let user = await User.findOne({
      email: req.body.email
    });
    
    if(user) return res.status(400).json({message: "User already exists. Please sign in."});

    user = new User(req.body);

    await user.save();

    const token = jwt.sign({
      userId: user.id,
      userName: user.firstName,
      userEmail: user.email
    }, process.env.JWT_SECRET_KEY as string, {expiresIn: "1m"});

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60000
    })

    return res.status(200).json({success: true, message: "New user created", user: user.email});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: `Something went wrong, Error > ${error}`})
  }
}