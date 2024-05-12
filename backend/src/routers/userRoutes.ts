import {Request, Response, Router} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/register", async(req: Request, res: Response)=>{
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

    return res.status(200)
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: `Something went wrong, Error > ${error}`})
  }
})

export default router;