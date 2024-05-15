import {createContext, ReactNode, useContext, useState} from "react";
import { AppContextType, ToastMessageType } from "../types";
import Toast from "../components/Toast";
import { useQuery } from "react-query";

import * as apiClient from '../api-client';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({children}: {children: ReactNode}) => {
  const [toast, setToast] = useState<ToastMessageType | undefined>(undefined);

  const {isError} = useQuery('validateToken', apiClient.validateToken, {
    retry: false
  })

  return <AppContext.Provider value={{
    showToast: (toastMessage) => {
      setToast(toastMessage);
    },
    isLoggedin: !isError
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