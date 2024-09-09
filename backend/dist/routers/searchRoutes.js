"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchController_1 = require("../controllers/searchController");
const router = (0, express_1.Router)();
// @function - 
// @route - /api/v1/search/hotels
// @access - public
router.get("/hotels", searchController_1.searchHotels);
exports.default = router;
