import { Router} from 'express';
import {createNewUser, getAllUsers, getLoggedinUser} from '../controllers/userController';
import User from '../models/user';
import tryCatch from '../utils/tryCatch';
import { registerValidator } from '../middleware/validator';
import verifyToken from '../middleware/auth';


const router = Router();

// @function - get the logged in User
// @route - /api/v1/users/me
// @access - logged in user 
router.get("/me", verifyToken, getLoggedinUser)


// @function - get all Users
// @route - /api/v1/users/all
// @access - admin only 
router.get('/all', getAllUsers)

// @function - create new User
// @route - /api/v1/users/register
// @access - public 
router.post("/register", registerValidator, createNewUser)

export default router;