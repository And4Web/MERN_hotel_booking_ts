"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    err.message = "Undefined Error or Bad Request or Internal Server Error";
    err.statusCode = 500;
    if (err.name === "CastError")
        err.message = "Invalid ID";
    return res.status(err.statusCode).json({ success: false, message: `Error: ${err.message}` });
};
exports.default = errorMiddleware;
