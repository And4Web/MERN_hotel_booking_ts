import {createContext, ReactNode, useContext, useState} from "react";
import { AppContextType, ToastMessageType } from "../types";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import {loadStripe} from '@stripe/stripe-js';

import * as apiClient from '../api-client';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;

const AppContext = createContext<AppContextType | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({children}: {children: ReactNode}) => {
  const [toast, setToast] = useState<ToastMessageType | undefined>(undefined);

  const {isError} = useQuery('validateToken', apiClient.validateToken, {
    retry: false
  })

  return <AppContext.Provider value={{
    showToast: (toastMessage) => {
      setToast(toastMessage);
    },
    isLoggedin: !isError,
    stripePromise
  }}>
    {
      toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}/>
    }
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context!
}