import { Router } from "express"; 
import { createHotel, getMyHotels, getSingleHotel } from "../controllers/hotelsController";
import upload from "../middleware/multer";
import verifyToken from "../middleware/auth";
import { createHotelValidator } from "../middleware/validator";

const router = Router();


// @function - create a hotel 
// @route - /api/v1/hotels/my-hotel
// @access - logged in users only
router.post('/my-hotel', verifyToken, createHotelValidator, upload.array('imageFiles', 6), createHotel);


// @function - get all hotels - user 
// @route - /api/v1/hotels/
// @access - logged in users only
router.get('/', verifyToken, getMyHotels)


// @function - display a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
router.get("/:hotelId", verifyToken, getSingleHotel);

export default router;