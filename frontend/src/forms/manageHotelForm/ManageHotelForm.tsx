import { FormProvider, useForm } from "react-hook-form"
import { HotelFormDataType } from "../../types";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";


function ManageHotelForm() {
  const formMethods = useForm<HotelFormDataType>();

  const {handleSubmit} = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormDataType)=>{
    // Create a new FormData object and call the API

    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());    
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());

    formDataJson.facilities.forEach((facility, index)=>{
      formData.append(`facilities[${index}]`, facility);
    })

    Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
      formData.append(`imageFiles`, imageFile);
    })


    


  })

  return (
    <FormProvider {...formMethods} >
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection/>
        <TypeSection/>
        <FacilitiesSection/>
        <GuestsSection/>
        <ImagesSection/>

        <span className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 font-bold hover:bg-blue-500 text-xl rounded">Save Hotel</button>
        </span>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm