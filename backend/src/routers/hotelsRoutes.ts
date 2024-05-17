import { Router } from "express"; 
import { createHotel } from "../controllers/hotelsController";
import upload from "../middleware/multer";

const router = Router();


// @function - create a hotel 
// @route - /api/v1/hotels/my-hotel
// @access - logged in users only
router.post('/my-hotel', upload.array('imageFiles', 6), createHotel);

export default router;