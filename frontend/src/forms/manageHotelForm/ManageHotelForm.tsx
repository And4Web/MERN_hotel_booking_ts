import { useForm } from "react-hook-form"
import { HotelFormDataType } from "../../types";

function ManageHotelForm() {
  const formMethods = useForm<HotelFormDataType>();
  return (
    <form></form>
  )
}

export default ManageHotelForm