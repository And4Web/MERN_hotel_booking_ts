export type RegisterFormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormDataType = {
  email: string;
  password: string;
}

export type ToastMessageType = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
  onClose?: () => void;
}

export type AppContextType = {
  showToast: (toastMessage: ToastMessageType) => void;
  isLoggedin: boolean;
}

export type HotelFormDataType = {
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
  imageFiles: FileList;  
}

export type PropsType = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
}