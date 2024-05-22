import { Request, Response } from "express";
import cloudinary from "cloudinary";
import { HotelSearchResponse, HotelType } from "../types/types";
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
    const imageUrls = await uploadImages(imageFiles);

    // 2. if upload successfull add the URLs to new hotel

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    // 3. save the new hotel in database
    const hotel = new Hotel(newHotel);
    await hotel.save();
    // 4. return a 201 status
    return res
      .status(201)
      .json({ success: true, message: "New hotel created." });
  } catch (error) {
    console.log("Error creating new hotel >>> ", error);
    return res
      .status(500)
      .json({ success: false, message: "Error creting new hotel" });
  }
};

// @function - get all hotels - user
// @route - /api/v1/hotels/
// @access - logged in users only
export const getMyHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    if (!hotels)
      return res
        .status(404)
        .json({ success: false, message: "Error fetching hotels." });

    return res.status(200).json({success: true, message: "My hotels list.", hotels})
    
  } catch (error) {
    console.log("getMyHotel Error >>> ", error);
    return res
      .status(404)
      .json({ success: false, message: "Error fetching hotels." });
  }
};


// @function - display a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
export const getSingleHotel = async(req:Request, res:Response) => {
  
  // /api/v1/hotels/983672y6453452
  const id = req.params.hotelId.toString();

  try {
    
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    }, {__v:0, updatedAt:0});

    if(!hotel) return res.status(404).json({success: false, message: "Hotel not found."})

    return res.status(200).json({success: true, message: "Hotel Details.", hotel});


  } catch (error) {
    return res.status(500).json({success: false, message: "Something went wrong.", error})
  }
}

// @function - update a hotel's details - user 
// @route - /api/v1/hotels/:hotelId
// @access - logged in users only
export const updateHotel = async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate({
      _id: req.params.hotelId,
      userId: req.userId,
    }, updatedHotel, {new: true});

    if(!hotel) return res.status(404).json({success: false, message: "Hotel not found."})

    const files = req.files as Express.Multer.File[];

    const upadatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...upadatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    return res.status(201).json({success: true, message: "Hotel updated.", hotel});
    
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({success: false, message: "Something went wrong", error});
  }
}

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");

    let dataURI = "data:" + image.mimetype + ";base64," + b64;

    const res = await cloudinary.v2.uploader.upload(dataURI, {
      folder: "hotel-booking",
    });

    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}


