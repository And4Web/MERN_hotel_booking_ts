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
};

export type ToastMessageType = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose?: () => void;
};

export type AppContextType = {
  showToast: (toastMessage: ToastMessageType) => void;
  isLoggedin: boolean;
};

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
  imageUrls: string[];
};

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
};

export type PropsType = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotelData?: HotelType;
};

export type HotelSearchResponse = { 
  success: boolean;
  message: string;
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type SearchContextType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

export type SearchParamsType = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void
}
