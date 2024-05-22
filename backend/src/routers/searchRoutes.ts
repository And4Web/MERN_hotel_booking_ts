import {Router} from 'express';
import { searchHotels } from '../controllers/searchController';

const router = Router();

// @function - 
// @route - /api/v1/search/hotels
// @access - public
router.get("/hotels", searchHotels);


export default router;