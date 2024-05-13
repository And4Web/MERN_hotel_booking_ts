import { Router} from 'express';
import {createNewUser, getAllUsers} from '../controllers/userController';
import User from '../models/user';
import tryCatch from '../utils/tryCatch';
import expressValidator from '../../middleware/validator';


const router = Router();

// @function - get all Users
// @route - /api/v1/users/all
// @access - admin only 
router.get('/all', getAllUsers)

// @function - create new User
// @route - /api/v1/users/register
// @access - public 
router.post("/register", expressValidator, createNewUser)

export default router;