import { Router } from "express";
import { userLogin, userLogout, validateToken } from "../controllers/authController";
import { loginValidator } from "../middleware/validator";
import verifyToken from "../middleware/auth";

const router = Router();

// @function - existing user log in
// @route - /api/v1/auth/sign-in
// @access - public
router.post('/sign-in', loginValidator, userLogin)

// @function - validate token after registration
// @route - /api/v1/auth/validate-token
// @access - restricted
router.get('/validate-token', verifyToken, validateToken)

// @function - invalidate token and sign out
// @route - /api/v1/auth/sign-out
// @access - restricted
router.post('/sign-out', userLogout)

export default router;