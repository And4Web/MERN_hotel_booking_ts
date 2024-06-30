import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { useAppContext } from "../contexts/AppContext";
import { useSearchContext } from "../contexts/SearchContext";
import BookingForm from "../forms/BookingForm/BookingForm";

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

  const { data: currentUser } = useQuery(
    "fetchLoggedinUserDetails ",
    apiClient.fetchLoggedinUserDetails
  );

  if (!data?.hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4 ">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={data?.hotel}
      />
      {currentUser?.user && paymentIntentData?.response?.paymentIntentId && (
        <Elements stripe={stripePromise} options={{
          clientSecret: paymentIntentData?.response?.clientSecret,

        }}>
          <BookingForm currentUser={currentUser?.user} paymentIntent={paymentIntentData?.response}/>
        </Elements>
        
      )}
    </div>
  );
}

export default Booking;
