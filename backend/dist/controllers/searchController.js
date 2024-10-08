"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHotels = void 0;
const hotels_1 = __importDefault(require("../models/hotels"));
const constructSearchQuery = (queryParams) => {
    let constructedQuery = {};
    if (queryParams.destination) {
        constructedQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ];
    }
    if (queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount)
        };
    }
    if (queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount)
        };
    }
    if (queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities]
        };
    }
    if (queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types]
        };
    }
    if (queryParams.starRatings) {
        const starRatings = Array.isArray(queryParams.starRatings) ? queryParams.starRatings.map((star) => parseInt(star)) : parseInt(queryParams.starRatings);
        constructedQuery.starRating = { $in: starRatings };
    }
    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            $lte: parseInt(queryParams.maxPrice.toString())
        };
    }
    return constructedQuery;
};
// @function - search hotels base on the filters and sorting
// @route - /api/v1/search/hotels
// @access - public
const searchHotels = async (req, res) => {
    try {
        const query = constructSearchQuery(req.query);
        // console.log("Query >>> ", query);
        let sortOptions = {};
        switch (req.query.sortOptions) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;
        const hotels = await hotels_1.default.find(query).sort(sortOptions).skip(skip).limit(pageSize);
        ;
        // don't send double query to database, do the pagination logic on the server yourself ---
        // const paginatedHotels = await Hotel.find().skip(skip).limit(pageSize);
        const total = await hotels_1.default.countDocuments(query);
        const response = {
            success: true,
            message: "Hotels Search Result",
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            }
        };
        return res.status(200).json({ response });
    }
    catch (error) {
        console.log("Error >>> ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
exports.searchHotels = searchHotels;
