import { useFormContext } from "react-hook-form"
import { HotelFormDataType } from "../../types";


function ImagesSection() {
  const {register, formState: {errors}, watch, setValue, } = useFormContext<HotelFormDataType>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string)=>{
    event.preventDefault();

    setValue("imageUrls", existingImageUrls.filter((url)=>url !== imageUrl))
  }
  
  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {
          existingImageUrls && (
            <div className="grid grid-cols-6 gap-4">
              {existingImageUrls.map((url)=>(
                <div className="relative group">
                  <img src={url} alt="Hotel Image"  className="min-h-full object-cover"/>
                  <button className="absolute inset-0 text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 font-semibold flex items-center justify-center" onClick={(event)=>handleDelete(event, url)}>Delete</button>
                </div>
              ))
            }
            </div>
          )
        }
        <input className="w-full text-gray-700 font-normal" type="file" multiple accept="image/*" {...register('imageFiles', {
          validate: (imageFiles) => {
            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
            
            if(totalLength === 0) return "At least one image must be added.";
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