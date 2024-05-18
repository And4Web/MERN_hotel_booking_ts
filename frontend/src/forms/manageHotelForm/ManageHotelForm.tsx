import { FormProvider, useForm } from "react-hook-form"
import { HotelFormDataType } from "../../types";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";


function ManageHotelForm() {
  const formMethods = useForm<HotelFormDataType>();

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection/>
        <TypeSection/>
        <FacilitiesSection/>
        <GuestsSection/>
        <ImagesSection/>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm