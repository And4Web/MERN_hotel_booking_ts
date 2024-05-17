import { Router } from "express"; 
import { createHotel } from "../controllers/hotelsController";
import upload from "../middleware/multer";
import verifyToken from "../middleware/auth";
import { createHotelValidator } from "../middleware/validator";

const router = Router();


// @function - create a hotel 
// @route - /api/v1/hotels/my-hotel
// @access - logged in users only
router.post('/my-hotel', verifyToken, createHotelValidator, upload.array('imageFiles', 6), createHotel);

export default router;