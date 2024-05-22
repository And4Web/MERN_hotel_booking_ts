import { useMutation, useQuery } from "react-query"
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm"
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import { HotelType } from "../types";


function EditHotel() {
  const {hotelId} = useParams();
  const {showToast} = useAppContext();

  const {data: hotelData} = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelById(hotelId || ""), {
    enabled: !!hotelId,
    onError: () => {
      showToast({message: "Hotel data not retrieved.", type: "ERROR"});
    }
  })

  const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
    onSuccess: ()=>{
      showToast({message: "Updated Hotel.",type: "SUCCESS"})
    },
    onError: () => {
      showToast({message: "Failed Updating hotel.",type: "ERROR"})
    }
  })

 
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }


  return (
    <ManageHotelForm hotelData={hotelData?.hotel as HotelType} onSave={handleSave} isLoading={isLoading}/>
  )
}

export default EditHotel