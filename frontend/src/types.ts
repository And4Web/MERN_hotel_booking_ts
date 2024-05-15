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
