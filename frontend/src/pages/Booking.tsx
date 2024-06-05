import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";

function Booking() { 

  const search = useSearchContext();
  const {hotelId} = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  const {data} = useQuery("fetchHotelById", ()=> apiClient.fetchHotelById(hotelId as string), {
    enabled: !!hotelId
  }); 

  useEffect(()=>{
    if(search.checkIn && search.checkOut){
      const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (24*60*60*1000);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut])

  const { data: currentUser } = useQuery(
    "fetchLoggedinUserDetails ",
    apiClient.fetchLoggedinUserDetails
  );

  console.log("Booking.tsx >>> ", numberOfNights, data?.hotel); 

  if(!data?.hotel){
    return <></>
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4 ">
      {/* <div className="bg-green-200 font-bold text-xl p-2 rounded">
        {"Booking Details Summary".toUpperCase()}
      </div> */}
      <BookingDetailSummary checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numberOfNights={numberOfNights} hotel={data?.hotel}/>
      {
        currentUser?.user && <BookingForm currentUser={currentUser?.user}/>
      }     

      {/* <div className="bg-blue-200 font-bold text-xl rounded p-2">
       
      </div> */}
    </div>
  );
}

export default Booking;
