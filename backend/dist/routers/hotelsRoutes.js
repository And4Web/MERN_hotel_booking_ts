"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelsController_1 = require("../controllers/hotelsController");
const auth_1 = __importDefault(require("../middleware/auth"));
const multer_1 = __importDefault(require("../middleware/multer"));
const validator_1 = require("../middleware/validator");
const router = (0, express_1.Router)();
// @method - POST - create a hotel 
// @route - /api/v1/hotels/my-hotel
// @access - logged in users only
router.post('/my-hotel', auth_1.default, validator_1.createHotelValidator, multer_1.default.array('imageFiles', 6), hotelsController_1.createHotel);
// @method - GET - get all hotels
// @route - /api/v1/hotels/all
// @access - PUBLIC
router.get('/all', hotelsController_1.getAllHotels);
// @method - GET - get all hotels - user 
// @route - /api/v1/hotels/
// @access - logged in users only
router.get('/', auth_1.default, hotelsController_1.getMyHotels);
// @method - GET - display a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
router.get("/:hotelId", auth_1.default, hotelsController_1.getSingleHotel);
// @method - PUT - update a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
router.put("/:hotelId", auth_1.default, multer_1.default.array("imageFiles"), hotelsController_1.updateHotel);
// @method - GET - get hotel's details 
// @route - /api/v1/hotels/detail/:hotelId
// @access - public
router.get('/detail/:hotelId', validator_1.hotelIdValidator, hotelsController_1.getHotelDetails);
// @method - POST - hotel booking payment intent creation 
// @route - /api/v1/hotels/:hotelId/bookings/payment-intent
// @access - protected
router.post('/:hotelId/bookings/payment-intent', auth_1.default, hotelsController_1.createPaymentIntent);
// @method - POST - create hotel booking after payment confirmation
// @route - /api/v1/hotels/:hotelId/bookings
// @access - protected
router.post('/:hotelId/bookings', auth_1.default, hotelsController_1.CreateHotelBooking);
exports.default = router;
