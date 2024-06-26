import { BookingFormData, FetchHotelDetailResponseType, HotelSearchResponse, HotelType, LoginFormDataType, MyBookingResponseType, PaymentIntentResponse, RegisterFormDataType, SearchParamsType, UserResponseType } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string || "";


export const register = async(formData: RegisterFormDataType)=>{
  const response = await fetch(`${API_BASE_URL}/v1/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const responseBody = await response.json();

  if(!response.ok){
    throw new Error(responseBody.message)
  }
};


export const login = async (formData: LoginFormDataType) => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(formData)
  })

  const body = await response.json();

  if(!response.ok) throw new Error(body.message);

  return body;
}


export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/validate-token`, {
    credentials: 'include'
  })

  if(!response.ok) throw new Error("Token invalid.");

  return response.json()
}

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/sign-out`, {
    credentials: "include",
    method: "POST"
  })

  if(!response.ok) throw new Error("Error logging out.")
}

export const addMyHotel = async (hotelFormData: FormData) => {
  
  const response = await fetch(`${API_BASE_URL}/v1/hotels/my-hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  })

  if(!response.ok) throw new Error("Error creating new hotel.")
 
  return response.json();
}

export const fetchAllHotels = async ():Promise<{success: boolean; message: string; hotels: HotelType[]}> => {
 const response = await fetch(`${API_BASE_URL}/v1/hotels/all`, {
  credentials: "include"
 })

 if(!response) throw new Error('Error fetching all hotels.');

 return response.json();
}


export const fetchMyHotels = async(): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/v1/hotels`,{
    credentials: "include"
  });

  if(!response.ok) throw new Error("Error fetching hotels.")

  return response.json();

}

export const fetchMyHotelById = async (hotelId) => {
const response = await fetch(`${API_BASE_URL}/v1/hotels/${hotelId}`, {
  credentials: "include"
});

if(!response.ok) throw new Error("Error fetching the Hotel.");

return response.json();
}

export  const updateMyHotelById = async(hotelFormData: FormData)=>{
  const response = await fetch(`${API_BASE_URL}/v1/hotels/${hotelFormData.get('hotelId')}`,{
    method: "PUT",
    body: hotelFormData,
    credentials: "include"
  })

  if(!response.ok) throw new Error("Failed to update hotel")

  return response.json()

}


export const searchHotels = async (searchParams: SearchParamsType): Promise<HotelSearchResponse> => {

  const queryParams = new URLSearchParams();

  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOptions", searchParams.sortOptions || "");
 
  searchParams.facilities?.forEach((facility)=>{
    queryParams.append("facilities", facility);
  })

  searchParams.types?.forEach((type)=>{
    queryParams.append("types", type);
  })

  searchParams.starRatings?.forEach((star)=>{
    queryParams.append("starRatings", star);
  })

  const response = await fetch(`${API_BASE_URL}/v1/search/hotels?${queryParams}`);

  if(!response.ok) throw new Error('Error fetching hotels.');

  // console.log("Search Response >>> ", response);

  return response.json();
}


export const fetchHotelById = async(hotelId: string):Promise<FetchHotelDetailResponseType> => {
  const response = await fetch(`${API_BASE_URL}/v1/hotels/detail/${hotelId}`);

  if(!response.ok) throw new Error("Error fetching hotel details");

  // console.log("response fetch Hotel details >>> ", response)
  return response.json();

}

export const fetchLoggedinUserDetails = async ():Promise<UserResponseType> => {
  const response = await fetch(`${API_BASE_URL}/v1/users/me`, {
    credentials: "include"
  })

  if(!response.ok) throw new Error("Error fetching user details.");

  return response.json();
}

export const createPaymentIntent = async(hotelId: string, numberOfNights: number): Promise<PaymentIntentResponse> => {
  const response = await fetch(`${API_BASE_URL}/v1/hotels/${hotelId}/bookings/payment-intent`, {
    credentials: 'include',
    method: "POST",
    body: JSON.stringify({
      numberOfNights
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if(!response.ok) throw new Error("Error fetching payment intent.")

  return response.json();
}

export const createBookingRoom = async (formData: BookingFormData) => {
  const response = await fetch(`${API_BASE_URL}/v1/hotels/${formData.hotelId}/bookings`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
  }) 

  if(!response.ok) throw new Error("Error creating new booking room.")

  return response.json();
}

export const fetchMyBookings = async (): Promise<MyBookingResponseType> => {
  const response = await fetch(`${API_BASE_URL}/v1/my-bookings`, {
    credentials: "include"
  })

  if(!response.ok) throw new Error("Failed to fetch hotels bookings.")

  return response.json();
}