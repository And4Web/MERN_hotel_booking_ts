"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validator_1 = require("../middleware/validator");
const router = (0, express_1.Router)();
// @function - get all Users
// @route - /api/v1/users/all
// @access - admin only 
router.get('/all', userController_1.getAllUsers);
// @function - create new User
// @route - /api/v1/users/register
// @access - public 
router.post("/register", validator_1.registerValidator, userController_1.createNewUser);
exports.default = router;
