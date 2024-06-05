import { NextFunction, Request, Response } from "express";

export type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
}

export type HotelSearchResponse = {
  success: boolean;
  message: string;
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  }
}

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
}
