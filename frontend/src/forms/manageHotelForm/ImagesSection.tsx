import { useFormContext } from "react-hook-form"
import { HotelFormDataType } from "../../types";


function ImagesSection() {
  const {register, formState: {errors}} = useFormContext<HotelFormDataType>();

  
  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input className="w-full text-gray-700 font-normal" type="file" multiple accept="image/*" {...register('imageFiles', {
          validate: (imageFiles) => {
            const totalLength = imageFiles.length;
            
            if(totalLength < 1) return "At least one image must be added.";
            if(totalLength > 6) return "More than 6 images can not be uploaded.";

            return true;
          }
        })}/>
      </div>
      {
        errors.imageFiles && (
          <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles.message}
          </span>
        )
      }
    </>
  )
}

export default ImagesSection