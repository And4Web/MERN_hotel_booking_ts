import { Request, Response } from "express";
import Hotel from "../models/hotels";
import { HotelSearchResponse } from "../types/types";


// @function - search hotels base on the filters and sorting
// @route - /api/v1/search/hotels
// @access - public
export const searchHotels = async(req: Request, res: Response)=>{
  try {
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");

    // console.log("page number >>> ", req.query, pageNumber);

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize);;
    // don't send double query to database, do the pagination logic on the server yourself ---
    // const paginatedHotels = await Hotel.find().skip(skip).limit(pageSize);

    const total = await Hotel.countDocuments();

    const response: HotelSearchResponse = {
      success: true, 
      message: "Hotels Search Result", 
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      }
    }

    return res.status(200).json({response});  

  } catch (error) {
    console.log("Error >>> ", error)
    return res.status(500).json({success: false, message: "Something went wrong"})
  }
}
