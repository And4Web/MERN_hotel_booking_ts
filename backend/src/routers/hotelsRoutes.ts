import { Router } from "express";
import { createHotel, getHotelDetails, getMyHotels, getSingleHotel, updateHotel } from "../controllers/hotelsController";
import verifyToken from "../middleware/auth";
import upload from "../middleware/multer";
import { createHotelValidator, hotelIdValidator } from "../middleware/validator";

const router = Router();


// @method - POST - create a hotel 
// @route - /api/v1/hotels/my-hotel
// @access - logged in users only
router.post('/my-hotel', verifyToken, createHotelValidator, upload.array('imageFiles', 6), createHotel);


// @method - GET - get all hotels - user 
// @route - /api/v1/hotels/
// @access - logged in users only
router.get('/', verifyToken, getMyHotels)


// @method - GET - display a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
router.get("/:hotelId", verifyToken, getSingleHotel);


// @method - PUT - update a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
router.put("/:hotelId", verifyToken, upload.array("imageFiles"), updateHotel);

// @method - GET - get hotel's details 
// @route - /api/v1/hotels/:hotelId
// @access - public
router.get('/:hotelId', hotelIdValidator, getHotelDetails)

export default router;