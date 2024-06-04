import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useLocation, useParams } from "react-router-dom";
import BookingForm from "../forms/BookingForm/BookingForm";

function Booking() {
  const params = useParams();
  const location = useLocation();

  const { data: currentUser } = useQuery(
    "fetchLoggedinUserDetails ",
    apiClient.fetchLoggedinUserDetails
  );

  console.log("Booking.tsx >>> ", currentUser?.user);
  // console.log("Booking.tsx >>> ", location.pathname);

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4 ">
      <div className="bg-green-200 font-bold text-xl p-2 rounded">
        {"Booking Details Summary".toUpperCase()}
      </div>
      <BookingForm currentUser={currentUser?.user}/>

      {/* <div className="bg-blue-200 font-bold text-xl rounded p-2">
       
      </div> */}
    </div>
  );
}

export default Booking;
