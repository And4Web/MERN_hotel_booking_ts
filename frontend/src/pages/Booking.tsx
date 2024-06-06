import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";
import { PaymentIntentResponse } from "../types";

function Booking() {
  const search = useSearchContext();
  const {stripePromise} = useAppContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (24 * 60 * 60 * 1000);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights as number
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

  const {paymentIntentId, clientSecret }= paymentIntentData.response;

  const { data: currentUser } = useQuery(
    "fetchLoggedinUserDetails ",
    apiClient.fetchLoggedinUserDetails
  );

  // console.log("Booking.tsx >>> ", paymentIntentId);

  if (!data?.hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4 ">
      {/* <div className="bg-green-200 font-bold text-xl p-2 rounded">
        {"Booking Details Summary".toUpperCase()}
      </div> */}
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={data?.hotel}
      />
      {currentUser?.user && paymentIntentId && (
        <Elements stripe={stripePromise} options={{
          clientSecret,

        }}>
          <BookingForm currentUser={currentUser?.user} paymentIntent={paymentIntentData?.response}/>
        </Elements>
        
      )}

      {/* <div className="bg-blue-200 font-bold text-xl rounded p-2">
       
      </div> */}
    </div>
  );
}

export default Booking;
