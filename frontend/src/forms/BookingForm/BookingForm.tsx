import { useForm } from "react-hook-form";
import { BookingFormData, PaymentIntentResponse } from "../../types";
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";

import * as apiClient from '../../api-client';
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
    },
  paymentIntent: {
    clientSecret: string;
    paymentIntentId: string;
    totalCost: number;
  }
    
};

function BookingForm({ currentUser, paymentIntent }: Props) {

  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const params = useParams();
  const navigate = useNavigate();
  const {showToast} = useAppContext();

  const {mutate: bookRoom, isLoading, isError, error} = useMutation(apiClient.createBookingRoom, {
    onSuccess: () => {
      // 
      showToast({message: "Booking saved.", type: "SUCCESS"});
      navigate("/my-bookings")
    },
    onError: () => {
      // 
      
      showToast({message: "Error saving booking.", type: "ERROR"});
    }
  })

  if(isError){
    console.log("Booking Error >>> ", error)
  }

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: params.hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId
    },
  });


  const onSubmit = async (formData: BookingFormData) => {
    if(!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement) as StripeCardElement
      }
    });

    if(result.paymentIntent?.status === "succeeded"){
      // create a Booking room
      bookRoom({...formData, paymentIntentId: result.paymentIntent.id});
    }
  }

  // console.log("BookingForm.tsx >>> ", paymentIntent);

  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-3xl font-bold">Confirm your details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="focus:outline-none mt-1 border rounded text-gray-700 w-full py-2 px-3 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="focus:outline-none mt-1 border rounded text-gray-700 w-full py-2 px-3 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="text"
            className="focus:outline-none mt-1 border rounded text-gray-700 w-full py-2 px-3 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      {/*  */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold"> Your price summary: </h2>
      </div>

      {/*  */}
      <div className="bg-blue-200 p-4 rounded-md">
        <div className="font-semibold text-lg">
          Total Cost: &#x20B9;{paymentIntent.totalCost.toFixed(2)}
        </div>

        <div className="text-xs">Includes taxes and charges.</div>
      </div>

      {/*  */}

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment details: </h3>
        <CardElement id="payment-element" className="border rounded-md p-2 text-sm"></CardElement>
      </div>

      <div className="flex justify-end">
        <button disabled={isLoading} type="submit" className="bg-blue-600 font-bold hover:bg-blue-500 text-white text-md p-2 rounded disabled:bg-gray-500">
          {isLoading ? "Saving..." : "Confirm Booking"}          
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
