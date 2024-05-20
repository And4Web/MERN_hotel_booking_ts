import { Router } from "express"; 
import { createHotel, getMyHotels } from "../controllers/hotelsController";
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

export default router;