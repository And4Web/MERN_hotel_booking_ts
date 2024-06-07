import Router from 'express';
import verifyToken from '../middleware/auth';
import { getMyBookings } from '../controllers/myBookings';

const router = Router();

// @method - GET - list of bookings done by a user
// @route - /api/v1/my-bookings/
// @access - protected
router.get('/', verifyToken, getMyBookings);


export default router;

