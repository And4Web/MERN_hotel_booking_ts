import { useFormContext } from "react-hook-form"
import { HotelFormDataType } from "../../types";


function GuestsSection() {
  const {register, formState: {errors}} = useFormContext<HotelFormDataType>();
  return (
    <div>
      <h2 className="text-2xl font-bold">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 font-semibold text-sm">
          Adults
          <input type="number" className="border rounded w-full py-2 px-3 font-normal" min={1} {...register("adultCount", {required: "Adult count is required."})}/>
        </label>
        {errors.adultCount && (
          <span className="text-red-500 font-bold text-sm">{errors.adultCount.message}</span>
        )}
        <label className="text-gray-700 font-semibold text-sm">
          Children
          <input type="number" className="border rounded w-full py-2 px-3 font-normal" min={0} {...register("childCount", {required: "Adult count is required."})}/>
        </label>
        {errors.childCount && (
          <span className="text-red-500 font-bold text-sm">{errors.childCount.message}</span>
        )}
      </div>
    </div>
  )
}

export default GuestsSection