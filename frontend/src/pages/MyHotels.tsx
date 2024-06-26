import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { BsMap } from "react-icons/bs";
import { BiBuilding, BiHotel, BiMoney, BiStar } from "react-icons/bi";


function MyHotels() {
  const {showToast} = useAppContext();

  const {data: hotelData} = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
    onError: ()=>{
      showToast({message: "Failed fetching your hotels.", type: "ERROR"})
    }
  })

  if(!hotelData){
    return <span>No Hotels Found</span>
  }
  
  return (
    <div className="space-y-5">
      <span className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link to="/add-hotel" className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded">Add Hotel</Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {
          hotelData.hotels.map((hotel, index)=>(
            <div key={index} className="flex flex-col justify-between border border-slate-300 rounded p-8 gap-5">
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <div className="mr-2">
                    <BsMap />
                  </div>
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-2">
                  <BiBuilding />
                </div>
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-2">
                 <BiMoney />
                </div>
                 &#8377; {hotel.pricePerNight} per night
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-2">
                 <BiHotel />
                </div>
                 {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <div className="mr-2">
                 <BiStar />
                </div>
                 {hotel.starRating} Star rating
                </div>
              </div>
              <span className="flex justify-end">
                <Link to={`/edit-hotel/${hotel._id}`} className="bg-blue-600 text-white font-bold hover:bg-blue-500 p-2 rounded">View Details</Link>
              </span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyHotels