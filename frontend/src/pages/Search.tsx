import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client';


function Search() {
  const search = useSearchContext();
  
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
  }

  const {data: searchHotelData} = useQuery(["searchHotels", URLSearchParams], () => apiClient.searchHotels(searchParams))
  
  return (
    <div>Search Page</div>
  )
}

export default Search