import { NextFunction, Request } from 'express';
import {check, validationResult} from 'express-validator';

// const validator = (req: Request, next: NextFunction) => {
//   const {firstName, lastName, email, password} = req.body;
//   let validate = [
//     check(firstName, "firstName is required.").isString(),
//     check(lastName, "lastName is required.").isString(),
//     check(email, "Email is not Correct.").isEmail(),
//     check(password, "Password is required and should be at least 8 characters long.").isString().isLength({min: 8})
//   ]

//   const error = validationResult(validate);

//   next(error)
// }

// export default validator;

const expressValidator = [
  check("firstName", "firstName is required and should be at least 3 characters long.").isString().isLength({min:3}),
  check("lastName", "lastName is required and should be at least 3 characters long.").isString().isLength({min:3}),
  check("email", "Email is not Correct.").isEmail(),
  check("password", "Password is required and should be at least 8 characters long.").isString().isLength({min: 8})
];

export default expressValidator;