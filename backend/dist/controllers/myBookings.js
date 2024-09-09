"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBookings = void 0;
const hotels_1 = __importDefault(require("../models/hotels"));
// @function - list of bookings done by a user
// @route - /api/v1/my-bookings/
// @access - protected
const getMyBookings = async (req, res) => {
    try {
        const hotels = await hotels_1.default.find({
            bookings: { $elemMatch: { userId: req.userId } }
        });
        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter(booking => booking.userId === req.userId);
            const hotelWithUserBookings = {
                ...hotel.toObject(),
                bookings: userBookings
            };
            return hotelWithUserBookings;
        });
        return res.status(200).json({ success: true, message: "Hotels with user bookings.", results });
    }
    catch (error) {
        console.log("error >>> ", error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};
exports.getMyBookings = getMyBookings;
