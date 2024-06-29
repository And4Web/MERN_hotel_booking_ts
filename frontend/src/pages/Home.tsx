import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import LatestDestinationCard from '../components/LatestDestinationCard';


function Home() {
  const {showToast} = useAppContext();
  const {data} = useQuery('fetchAllHotelsQuery', apiClient.fetchAllHotels,{
    onError: ()=>{
      showToast({message: "Failed fetching hotels list.", type: "ERROR"})
    }
  });
  // console.log(hotels);

  const topRowHotels = data?.hotels?.slice(0,2) || [];
  const bottomRowHotels = data?.hotels?.slice(2) || [];

  return (
    <div className='space-y-3'>
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel, index)=>{
            return (
              <LatestDestinationCard key={index} hotel={hotel}/>
            )
          })}
        </div>


        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {
            bottomRowHotels.map((hotel, index)=>(
              <LatestDestinationCard key={index} hotel={hotel}/>
            ))
          }
        </div>

        
      </div>
    </div>
  )
}

export default Home