import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelType } from "../types/types";


// @function - list of bookings done by a user
// @route - /api/v1/my-bookings/
// @access - protected
export const getMyBookings = async (req:Request, res:Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: {$elemMatch: {userId: req.userId}}
    });

    const results = hotels.map((hotel)=>{
      const userBookings = hotel.bookings.filter(booking=>booking.userId === req.userId);

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings
      }

      return hotelWithUserBookings;
    })
    

    return res.status(200).json({success: true, message: "Hotels with user bookings.", results})

  } catch (error) {
    console.log("error >>> ", error);
    return res.status(500).json({success: false, message: "Something went wrong."})
  }
}