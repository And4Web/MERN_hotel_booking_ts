"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validator_1 = require("../middleware/validator");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
// @function - existing user log in
// @route - /api/v1/auth/sign-in
// @access - public
router.post('/sign-in', validator_1.loginValidator, authController_1.userLogin);
// @function - validate token after registration
// @route - /api/v1/auth/validate-token
// @access - restricted
router.get('/validate-token', auth_1.default, authController_1.validateToken);
// @function - invalidate token and sign out
// @route - /api/v1/auth/sign-out
// @access - restricted
router.post('/sign-out', authController_1.userLogout);
exports.default = router;
