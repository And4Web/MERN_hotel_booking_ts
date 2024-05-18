import { useFormContext } from "react-hook-form"
import { HotelFormDataType } from "../../types";


function DetailsSection() {
  const {register, formState: {errors}} = useFormContext<HotelFormDataType>();
  // console.log(register);
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">Name
      <input
        type="text"
        className="border rounded w-full py-1 px-2 font-normal"
        {...register("name", { required: "Hotel name is required." })}
      />
      {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      
      <div className="flex gap-4">
      <label className="text-gray-700 text-sm font-bold flex-1">City
      <input
        type="text"
        className="border rounded w-full py-1 px-2 font-normal"
        {...register("city", { required: "City name is required." })}
      />
      {errors.city && (
          <span className="text-red-500">{errors.city.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">Country
      <input
        type="text"
        className="border rounded w-full py-1 px-2 font-normal"
        {...register("country", { required: "Country name is required." })}
      />
      {errors.country && (
          <span className="text-red-500">{errors.country.message}</span>
        )}
      </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">Description
      <textarea
        rows={10}
        className="border rounded w-full py-1 px-2 font-normal"
        {...register("description", { required: "Description is required." })}
      />
      {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <div className="flex gap-4 justify-start items-center">
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">Price per night
      <input
        type="number"
        min={300}
        className="border rounded w-full py-1 px-2 font-normal"
        {...register("pricePerNight", { required: "Price per night is required." })}
      />
      {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">Star Rating
      <select {...register("starRating", {required: "Star rating is Required."})} className="border rounded w-full p-1 text-gray-700 font-normal">
        <option value="" className="text-sm font-bold">
          Select rating
        </option>
        {[1, 2, 3, 4, 5].map((num, index)=>{
          return <option value={num} key={index}>{num}</option>
        })}
      </select>
      {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>

      </div>
    </div>
  )
}

export default DetailsSection