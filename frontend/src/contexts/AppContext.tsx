import {createContext, ReactNode, useContext, useState} from "react";
import { AppContextType, ToastMessageType } from "../types";
import Toast from "../components/Toast";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({children}: {children: ReactNode}) => {
  const [toast, setToast] = useState<ToastMessageType | undefined>(undefined);
  return <AppContext.Provider value={{
    showToast: (toastMessage) => {
      setToast(toastMessage);
    }
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