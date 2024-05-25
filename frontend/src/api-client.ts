import { HotelSearchResponse, HotelType, LoginFormDataType, RegisterFormDataType, SearchParamsType } from "./types";

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


  const response = await fetch(`${API_BASE_URL}/v1/search/hotels?${queryParams}`);

  if(!response.ok) throw new Error('Error fetching hotels.');

  
  return response.json();
}