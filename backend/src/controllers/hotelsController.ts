import { Request, Response } from "express";
import cloudinary from 'cloudinary';


// @function - create a hotel 
// @route - /api/v1/hotels/my-hotel
// @access - private
export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel = req.body;
    // console.log("imageFiles >>> ", imageFiles);
    // 1. upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      
      const res = await cloudinary.v2.uploader.upload(dataURI, {folder: "hotel-booking"});

      return res.url;
    })
    const imageUrls = await Promise.all(uploadPromises);
    // console.log("image >>> ", imageUrls);
    // 2. if upload successfull add the URLs to new hotel
    
    // 3. save the new hotel in database
    // 4. return a 201 status
    return res.status(201).json({})

  } catch (error) {
    console.log("Error creating new hotel >>> ", error);
    return res.status(500).json({success: false, message: "Error creting new hotel"});
  }
}