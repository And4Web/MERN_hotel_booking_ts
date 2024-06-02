import { useForm } from "react-hook-form";
import { GuestInfoFormType } from "../../types";
import DatePicker from "react-datepicker";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

function GuestInfoForm({ hotelId, pricePerNight }: Props) {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormType>();

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">
        {" "}
        &#8377; {pricePerNight}/- per night
      </h3>
      <form action="">
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-2 min-w-full">
            <label htmlFor="" className="items-center">
              Adults:
              <input
                type="number"
                className="focus:outline-none h-8 p-2 w-full"
                placeholder="Adult Count"
                min={1}
                max={20}
                {
                  ...register("adultCount", {
                    required: "Adult count is required.",
                    min: {
                      value: 1,
                      message: "There must be at least 1 adult."
                    },
                    valueAsNumber: true,
                  })
                }
              />
            </label>

            <label htmlFor="" className="items-center ">
              Children:
              <input
                type="number"
                className="focus:outline-none h-8 p-2 w-full"
                placeholder="Child Count"
                min={0}
                max={20}
                {
                  ...register('childCount',{
                    valueAsNumber: true,
                  })
                }
              />
            </label>
            {
              errors.adultCount && (
                <span className="text-red-500 font-semibold text-sm">{errors.adultCount.message}</span>
              )
            }
          </div>
        </div>
      </form>
    </div>
  );
}

export default GuestInfoForm;
