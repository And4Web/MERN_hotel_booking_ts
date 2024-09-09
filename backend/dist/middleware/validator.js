"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelIdValidator = exports.createHotelValidator = exports.loginValidator = exports.registerValidator = void 0;
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
exports.createHotelValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name of the hotel is required"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("City of the hotel is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country of the hotel is required"),
    (0, express_validator_1.body)("type").notEmpty().withMessage("Type of the hotel is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description of the hotel is required"),
    (0, express_validator_1.body)("adultCount").notEmpty().isNumeric().withMessage("Adult count is required and must be a number"),
    (0, express_validator_1.body)("childCount").notEmpty().isNumeric().withMessage("Child count is required and must be a number."),
    (0, express_validator_1.body)("starRating").notEmpty().isNumeric().withMessage("star rating of the hotel is required and must be a number between 0 and 5"),
    (0, express_validator_1.body)("pricePerNight").notEmpty().isNumeric().withMessage("Price per night in the hotel is required"),
    (0, express_validator_1.body)("facilities").notEmpty().isArray().withMessage("facilities in the hotel is required."),
    (0, express_validator_1.body)("")
];
exports.hotelIdValidator = [
    (0, express_validator_1.param)("hotelId").notEmpty().withMessage("Hotel Id is required.")
];
