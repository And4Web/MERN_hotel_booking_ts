import { FormProvider, useForm } from "react-hook-form"
import { HotelFormDataType } from "../../types";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";

function ManageHotelForm() {
  const formMethods = useForm<HotelFormDataType>();
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection/>
        <TypeSection/>
        <FacilitiesSection/>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm