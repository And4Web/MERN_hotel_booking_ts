"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.validateToken = exports.userLogin = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// @function - 
// @route - /api/v1/auth/sign-in
// @access - public
const userLogin = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorList = errors.array().map(e => e.msg);
        console.log(errorList);
        return res.status(400).json({ success: false, message: "Invalid credentials.", errors: errorList });
    }
    const { email, password } = req.body;
    try {
        const user = await user_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch)
            return res.status(404).json({ success: false, message: "invalid credentials." });
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            userName: user.firstName,
            userEmail: user.email
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000
        });
        return res.status(200).json({ success: true, message: "Logged in", userId: user._id });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
};
exports.userLogin = userLogin;
// @function - validate token after registration
// @route - /api/v1/auth/validate-token
// @access - restricted
const validateToken = async (req, res) => {
    return res.status(200).json({ success: true, userId: req.userId });
};
exports.validateToken = validateToken;
// @function - invalidate token and sign out
// @route - /api/v1/auth/sign-out
// @access - restricted
const userLogout = async (req, res) => {
    // return an invalid token to the client which expires at the time of creation:
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    return res.status(200).json({ success: true, message: "signed out." });
};
exports.userLogout = userLogout;
