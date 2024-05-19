import { Request, Response } from "express";
import cloudinary from 'cloudinary';
import { HotelType } from "../types/types";
import Hotel from "../models/hotels";


// @function - create a hotel 
// @route - /api/v1/hotels/my-hotel
// @access - private
export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    // console.log("hotelsController >>> ", imageFiles, req.userId, newHotel);
    
    // 1. upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      
      const res = await cloudinary.v2.uploader.upload(dataURI, {folder: "hotel-booking"});

      return res.url;
    })
    const imageUrls = await Promise.all(uploadPromises);
    // 2. if upload successfull add the URLs to new hotel
    
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;
    
    // 3. save the new hotel in database
    const hotel = new Hotel(newHotel);
    await hotel.save();
    // 4. return a 201 status
    return res.status(201).json({success: true, message: "New hotel created." })

  } catch (error) {
    console.log("Error creating new hotel >>> ", error);
    return res.status(500).json({success: false, message: "Error creting new hotel"});
  }
}