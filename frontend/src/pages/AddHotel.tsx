import { useMutation } from "react-query"
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm"
import * as apiClient from '../api-client'; 
import { useAppContext } from "../contexts/AppContext";

function AddHotel() {
  const {showToast} = useAppContext();

  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: ()=>{
      showToast({message: "Hotel saved", type: "SUCCESS"});
    },
    onError: ()=>{
      showToast({message: "Error saving new Hotel", type: "ERROR"})
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  }

  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
  )
}

export default AddHotel;