import { useForm } from "react-hook-form";
import { BookingFormData } from "../../types";

type Props = {
  currentUser: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | undefined
}

function BookingForm({currentUser}: Props) {

  const {handleSubmit, register} = useForm<BookingFormData>();
  console.log("register >>> ", register);

  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      <span className="text-3xl font-bold">Confirm your details</span>
      <div className="grid grid-cols-2 gap-6">
        <label  className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input type="text"  className="focus:outline-none mt-1 border rounded text-gray-700 w-full py-2 px-3 bg-gray-200 font-normal" readOnly disabled {...register("firstName")}/>
        </label>
        <label  className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input type="text"  className="focus:outline-none mt-1 border rounded text-gray-700 w-full py-2 px-3 bg-gray-200 font-normal" readOnly disabled {...register('lastName')}/>
        </label>
        <label  className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input type="text"  className="focus:outline-none mt-1 border rounded text-gray-700 w-full py-2 px-3 bg-gray-200 font-normal" readOnly disabled {...register('email')}/>
        </label>
      </div>


    </form>
  )
}

export default BookingForm