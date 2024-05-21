import { useQuery } from "react-query"
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

  // console.log("HotelData >>> ", hotelData.hotel);

  return (
    <ManageHotelForm hotelData={hotelData?.hotel as HotelType} onSave={()=>console.log("saved")} isLoading={false}/>
  )
}

export default EditHotel