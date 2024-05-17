import { Request, Response } from "express";


// @function - create a hotel 
// @route - /api/v1/hotels/my-hotel
// @access - private
export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel = req.body;

    // 1. upload images to cloudinary
    // 2. if upload successfull add the URLs to new hotel
    // 3. save the new hotel in database
    // 4. return a 201 status

  } catch (error) {
    console.log("Error creating new hotel >>> ", error);
    return res.status(500).json({success: false, message: "Error creting new hotel"});
  }
}