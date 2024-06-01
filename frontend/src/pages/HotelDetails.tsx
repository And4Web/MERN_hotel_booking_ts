import { AiFillStar } from "react-icons/ai";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";

function HotelDetails() {
  const { hotelId } = useParams();

  const { data } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  // const {hotel} = data;
  
  // console.log("hotel details >>> ", hotelId, hotel)

  if(!data?.hotel){
    return <></>;
  }

  return (
  <div className="space-y-6">
    <div>
       <span className="flex">
         {Array.from({length: data?.hotel?.starRating as number}).map((_, index)=>{
          return <AiFillStar key={index} className="fill-yellow-400"/>
        })}
      </span>

      <h1 className="text-3xl font-bold">{data?.hotel?.name}</h1>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 xxl:grid-cols-6 gap-4">
      {
        data?.hotel?.imageUrls.map((image, index)=>(
          <div key={index} className="h-[300px]">
            <img src={image} alt={data?.hotel?.name} className="rounded-md w-full h-full object-cover object-center"/>
          </div>


        ))
      }
    </div>

    <div className="grid grid-cols-3 xs:grid-cols-2 lg:grid-cols-6 gap-2"> 
      {
        data?.hotel?.facilities?.map((facility, index)=>{
          return <div key={index} className="border border-slate-300 rounded-sm p-1">
            {facility}
          </div>
        })
      }
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <div className="whitespace-pre-line">
        {data?.hotel?.description}
      </div>
      <div className="h-fit">
        {/* <GuestInfo/> */}
      </div>
    </div>
  </div>
  );
}

export default HotelDetails;
