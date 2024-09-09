"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHotelBooking = exports.createPaymentIntent = exports.getHotelDetails = exports.updateHotel = exports.getSingleHotel = exports.getMyHotels = exports.getAllHotels = exports.createHotel = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const hotels_1 = __importDefault(require("../models/hotels"));
const express_validator_1 = require("express-validator");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
// @function - create a hotel
// @route - /api/v1/hotels/my-hotel
// @access - private
const createHotel = async (req, res) => {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        // console.log("hotelsController >>> ", imageFiles, req.userId, newHotel);
        // 1. upload images to cloudinary
        const imageUrls = await uploadImages(imageFiles);
        // 2. if upload successfull add the URLs to new hotel
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        // 3. save the new hotel in database
        const hotel = new hotels_1.default(newHotel);
        await hotel.save();
        // 4. return a 201 status
        return res
            .status(201)
            .json({ success: true, message: "New hotel created." });
    }
    catch (error) {
        console.log("Error creating new hotel >>> ", error);
        return res
            .status(500)
            .json({ success: false, message: "Error creting new hotel" });
    }
};
exports.createHotel = createHotel;
// @function - get all hotels
// @route - /api/v1/hotels/all
// @access - PUBLIC
const getAllHotels = async (req, res) => {
    try {
        const hotels = await hotels_1.default.find().sort('-lastUpdated');
        return res.status(200).json({ success: true, message: "Hotels fetched successfully.", hotels });
    }
    catch (error) {
        console.log('error >>>', error);
        return res.status(500).json({ success: false, message: "Error fetching all hotels" });
    }
};
exports.getAllHotels = getAllHotels;
// @function - get all hotels - user
// @route - /api/v1/hotels/
// @access - logged in users only
const getMyHotels = async (req, res) => {
    try {
        const hotels = await hotels_1.default.find({ userId: req.userId });
        if (!hotels)
            return res
                .status(404)
                .json({ success: false, message: "Error fetching hotels." });
        return res.status(200).json({ success: true, message: "My hotels list.", hotels });
    }
    catch (error) {
        console.log("getMyHotel Error >>> ", error);
        return res
            .status(404)
            .json({ success: false, message: "Error fetching hotels." });
    }
};
exports.getMyHotels = getMyHotels;
// @function - display a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
const getSingleHotel = async (req, res) => {
    // /api/v1/hotels/983672y6453452
    const id = req.params.hotelId.toString();
    try {
        const hotel = await hotels_1.default.findOne({
            _id: id,
            userId: req.userId,
        }, { __v: 0, updatedAt: 0 });
        if (!hotel)
            return res.status(404).json({ success: false, message: "Hotel not found." });
        return res.status(200).json({ success: true, message: "Hotel Details.", hotel });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong.", error });
    }
};
exports.getSingleHotel = getSingleHotel;
// @function - update a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
const updateHotel = async (req, res) => {
    try {
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = await hotels_1.default.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        }, updatedHotel, { new: true });
        if (!hotel)
            return res.status(404).json({ success: false, message: "Hotel not found." });
        const files = req.files;
        const upadatedImageUrls = await uploadImages(files);
        hotel.imageUrls = [...upadatedImageUrls, ...(updatedHotel.imageUrls || [])];
        await hotel.save();
        return res.status(201).json({ success: true, message: "Hotel updated.", hotel });
    }
    catch (error) {
        console.log("error", error);
        return res.status(500).json({ success: false, message: "Something went wrong", error });
    }
};
exports.updateHotel = updateHotel;
async function uploadImages(imageFiles) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary_1.default.v2.uploader.upload(dataURI, {
            folder: "hotel-booking",
        });
        return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}
// @function - get a hotel's details
// @route - /api/v1/hotels/detail/:hotelId
// @access - public
const getHotelDetails = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const hotelId = req.params.hotelId.toString();
    try {
        const hotel = await hotels_1.default.findById(hotelId);
        if (!hotel)
            return res.status(400).json({ success: false, message: "Hotel not found." });
        return res.status(200).json({ success: true, message: "Hotel details.", hotel });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching hotel details." });
    }
};
exports.getHotelDetails = getHotelDetails;
// @function - hotel booking payment intent creation 
// @route - /api/v1/hotels/:hotelId/bookings/payment-intent
// @access - protected
const createPaymentIntent = async (req, res) => {
    // 3 Steps:
    // 1. Total Cost
    // 2. Hotel Id  
    // 3. User Id
    const { numberOfNights } = req.body;
    const { hotelId } = req.params;
    const hotel = await hotels_1.default.findById(hotelId);
    if (!hotel)
        return res.status(400).json({ success: false, message: "Hotel not found." });
    const totalCost = hotel.pricePerNight * numberOfNights;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "inr",
        metadata: {
            hotelId,
            userId: req.userId
        }
    });
    if (!paymentIntent.client_secret)
        return res.status(500).json({ success: false, message: "Error creating Payment intent." });
    const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost
    };
    return res.status(200).json({ success: true, message: "", response });
};
exports.createPaymentIntent = createPaymentIntent;
// @function - create hotel booking after payment confirmation 
// @route - /api/v1/hotels/:hotelId/bookings
// @access - protected
const CreateHotelBooking = async (req, res) => {
    try {
        const paymentIntetId = req.body.paymentIntentId;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntetId);
        if (!paymentIntent)
            return res.status(400).json({ success: false, message: "Payment intent not found in the request." });
        if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
            return res.status(400).json({ success: false, message: "Payment intent mismatch." });
        }
        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({ success: false, message: `Payment intent did not succeed - ${paymentIntent.status}` });
        }
        const newBooking = {
            ...req.body,
            userId: req.userId,
        };
        const hotel = await hotels_1.default.findOneAndUpdate({ _id: req.params.hotelId }, { $push: { bookings: newBooking } }, { new: true });
        if (!hotel)
            return res.status(400).json({ success: false, message: "Hotel not found." });
        await hotel.save();
        return res.status(200).json({ success: true, message: "New booking created." });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong." });
    }
};
exports.CreateHotelBooking = CreateHotelBooking;
