import { LoginFormDataType, RegisterFormDataType } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  if(!response.ok) throw new Error("Token invalid");

  return response.json()
}

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/sign-out`, {
    credentials: "include",
    method: "POST"
  })

  if(!response.ok) throw new Error("Error logging out")
}