import { Router } from "express";
import { userLogin, validateToken } from "../controllers/authController";
import { loginValidator } from "../../middleware/validator";
import verifyToken from "../../middleware/auth";

const router = Router();

// @function - existing user log in
// @route - /api/v1/auth/sign-in
// @access - public
router.post('/sign-in', loginValidator, userLogin)

// @function - validate token after registration
// @route - /api/v1/auth/validate-token
// @access - public
router.get('/validate-token', verifyToken, validateToken)

export default router;