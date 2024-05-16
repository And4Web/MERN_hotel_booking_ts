
import {check} from 'express-validator';

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