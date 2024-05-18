import { FormProvider, useForm } from "react-hook-form"
import { HotelFormDataType } from "../../types";
import DetailsSection from "./DetailsSection";

function ManageHotelForm() {
  const formMethods = useForm<HotelFormDataType>();
  return (
    <FormProvider {...formMethods}>
      <form>
        <DetailsSection/>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm