import { useQuery } from 'react-query';
import * as apiClient from '../api-client';


function Home() {

  const {data} = useQuery('fetchQuery', ()=>apiClient.fetchAllHotels);

  console.log(data);
  return (
    <div>Home</div>
  )
}

export default Home