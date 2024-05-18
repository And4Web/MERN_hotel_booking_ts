import { FormProvider, useForm } from "react-hook-form"
import { HotelFormDataType } from "../../types";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";

function ManageHotelForm() {
  const formMethods = useForm<HotelFormDataType>();
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection/>
        <TypeSection/>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm