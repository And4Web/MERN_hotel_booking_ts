"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const myBookings_1 = require("../controllers/myBookings");
const router = (0, express_1.default)();
// @method - GET - list of bookings done by a user
// @route - /api/v1/my-bookings/
// @access - protected
router.get('/', auth_1.default, myBookings_1.getMyBookings);
exports.default = router;
