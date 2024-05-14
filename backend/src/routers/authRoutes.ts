import { Router } from "express";
import { userLogin } from "../controllers/authController";
import { loginValidator } from "../../middleware/validator";

const router = Router();

// @function - existing user log in
// @route - /api/v1/auth/sign-in
// @access - public
router.post('/login', loginValidator, userLogin)



export default router;