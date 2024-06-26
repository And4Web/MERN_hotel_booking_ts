"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tryCatch = (controllerFunc) => {
    return async (req, res, next) => {
        await Promise.resolve(controllerFunc(req, res, next)).catch(err => next(err));
    };
};
exports.default = tryCatch;
