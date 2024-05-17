
import {body, check} from 'express-validator';

export const registerValidator = [
  check("firstName", "firstName is required and should be at least 3 characters long.").isString().isLength({min:3}),
  check("lastName", "lastName is required and should be at least 3 characters long.").isString().isLength({min:3}),
  check("email", "Email is not Correct.").isEmail(),
  check("password", "Password is required and should be at least 8 characters long.").isLength({min: 8})
];

export const loginValidator = [
  check("email", "Enter a correct email.").isEmail(),
  check("password", "Password is required and should be at least 8 characters long.").isLength({min: 8}),
]

export const createHotelValidator = [
  body("name").notEmpty().withMessage("Name of the hotel is required"),
  body("city").notEmpty().withMessage("City of the hotel is required"),
  body("country").notEmpty().withMessage("Country of the hotel is required"),
  body("type").notEmpty().withMessage("Type of the hotel is required"),
  body("description").notEmpty().withMessage("Description of the hotel is required"),
  body("adultCount").notEmpty().isNumeric().withMessage("Adult count is required and must be a number"),
  body("childCount").notEmpty().isNumeric().withMessage("Child count is required and must be a number."),
  body("starRating").notEmpty().isNumeric().withMessage("star rating of the hotel is required and must be a number between 0 and 5"),
  body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night in the hotel is required"),
  body("facilities").notEmpty().isArray().withMessage("facilities in the hotel is required."),
  body("")
]
