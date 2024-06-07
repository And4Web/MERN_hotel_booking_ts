import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

function MyBookings() {

  const {data} = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  console.log("fetch bookings >>> ", data?.results);

  if(!data || data.results?.length === 0) {
    return <h2>No Bookings found at this moment.</h2>
  }

  return (
    <div className='space-y-5'>
      <h1 className='text-3xl font-bold'>My Bookings</h1>
      {
        data?.results?.map((result, index)=>{
          return (
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded p-8 gap-5'>
              <div className='lg:w-full lg:h-[250px]'>
                <img src={result.imageUrls[0]} alt="hotel image" className='w-full h-full object-cover object-center'/>
              </div>

              <div className='flex flex-col gap-4 overflow-y-auto max-h-[300px]'>
                <div className='text-2xl font-bold'>
                  {result.name}
                  <div className='text-xs font-normal'>
                    {result.city}, {result.country}
                  </div>
                </div>

                {result.bookings?.map((booking, index)=>{
                  return (
                    <div>
                      <div>
                        <span className='font-bold mr-2 '>Dates: </span>
                        <span>{new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}</span>
                      </div>

                      <div>
                        <span className='font-bold mr-2'>Guests:</span>
                        <span>{booking.adultCount} adults & {booking.childCount} children</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyBookings