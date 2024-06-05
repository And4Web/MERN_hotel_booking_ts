

import { HotelType } from "../types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType | undefined
}

function BookingDetailSummary({checkIn, checkOut, adultCount, childCount, numberOfNights, hotel}: Props) {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your booking details</h2>
      <div className="border-b py-2">
        <b className="text-lg">Location:</b>
        <span className="font-normal">{` ${hotel?.name}, ${hotel?.city}, ${hotel?.country}.`}</span>
      </div>

      <div className="flex justify-between">
        <div>
          <b className="text-lg">Check-in</b>
          <div className="font-normal">{checkIn.toDateString()}</div>
        </div>
        <div>
          <b className="text-lg">Check-out</b>
          <div className="font-normal">{checkOut.toDateString()}</div>
        </div>
      </div>


      <div className="border-t border-b py-2">
        <b className="text-lg">Total duration of stay: </b>
        <div className="font-normal inline-block">{numberOfNights} nights</div>
      </div>

      <div>
        <b className="text-lg">Guests:</b>
        <div className="font-noraml">{adultCount} Adults & {childCount} Children</div>
      </div>
    </div>
  )
}

export default BookingDetailSummary