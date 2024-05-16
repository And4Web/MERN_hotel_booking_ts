"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.check)("firstName", "firstName is required and should be at least 3 characters long.").isString().isLength({ min: 3 }),
    (0, express_validator_1.check)("lastName", "lastName is required and should be at least 3 characters long.").isString().isLength({ min: 3 }),
    (0, express_validator_1.check)("email", "Email is not Correct.").isEmail(),
    (0, express_validator_1.check)("password", "Password is required and should be at least 8 characters long.").isLength({ min: 8 })
];
exports.loginValidator = [
    (0, express_validator_1.check)("email", "Enter a correct email.").isEmail(),
    (0, express_validator_1.check)("password", "Password is required and should be at least 8 characters long.").isLength({ min: 8 }),
];
