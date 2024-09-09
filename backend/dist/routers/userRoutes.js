"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validator_1 = require("../middleware/validator");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
// @function - get the logged in User
// @route - /api/v1/users/me
// @access - logged in user 
router.get("/me", auth_1.default, userController_1.getLoggedinUser);
// @function - get all Users
// @route - /api/v1/users/all
// @access - admin only 
router.get('/all', userController_1.getAllUsers);
// @function - create new User
// @route - /api/v1/users/register
// @access - public 
router.post("/register", validator_1.registerValidator, userController_1.createNewUser);
exports.default = router;
