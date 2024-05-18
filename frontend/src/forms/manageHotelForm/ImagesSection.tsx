import { useFormContext } from "react-hook-form"
import { HotelFormDataType } from "../../types";


function ImagesSection() {
  const {register, formState: {errors}} = useFormContext<HotelFormDataType>();
  return (
    <div>
      <h2 className="text-2xl font-bold">Images</h2>
      
    </div>
  )
}

export default ImagesSection