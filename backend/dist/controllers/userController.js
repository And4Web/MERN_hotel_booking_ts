"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
// @function - get all Users
// @route - /api/v1/users/all
// @access - admin only 
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await user_1.default.find({}).select("_id firstName lastName email");
        return res.status(200).json({ success: true, message: "list of all users", allUsers });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAllUsers = getAllUsers;
// @function - create new User
// @route - /api/v1/users/register
// @access - public
const createNewUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsList = errors.array().map(e => e.msg);
        return res.status(400).json({ success: false, message: errorsList });
    }
    try {
        let user = await user_1.default.findOne({
            email: req.body.email
        });
        if (user)
            return res.status(400).json({ message: "User already exists. Please sign in." });
        user = new user_1.default(req.body);
        await user.save();
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
        return res.status(200).json({ success: true, message: "New user created", user: user.email });
    }
    catch (error) {
        console.log("Error in user route, can't create new user >>> ", error);
        return res.status(500).json({ success: false, message: `Something went wrong, Error > ${error}` });
    }
};
exports.createNewUser = createNewUser;
