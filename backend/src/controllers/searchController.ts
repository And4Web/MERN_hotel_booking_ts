import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelSearchResponse } from "../types/types";


// @function - search hotels base on the filters and sorting
// @route - /api/v1/search/hotels
// @access - public
export const searchHotels = async(req: Request, res: Response)=>{
  try {
    const pageSize = 5;
    const pageNumber = parseInt(req.query.pageNumber ? req.query.pageNumber.toString() : "1");

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize);

    const total = hotels.length;

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      }
    }

    return res.status(200).json({success: true, message: "Hotels Search Result", response});
    // return res.json({message: "Hello Search!"})

  } catch (error) {
    console.log("Error >>> ", error)
    return res.status(500).json({success: false, message: "Something went wrong"})
  }
}
