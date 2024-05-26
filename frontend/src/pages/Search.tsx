import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client';
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";


function Search() {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  }

  // const {data: {response: {data:searchHotelData, pagination}}} = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))

  const {data} = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))
  const response = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))
  
  const searchHotelData = data?.response?.data;
  const pagination = data?.response?.pagination;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 sticky top-10 p-5 h-fit">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
          {/*TODO FILTERS */}
        </div>

      </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {pagination?.total} hotels found {search?.destination ? `in ${search?.destination} ` : ""}
            </span>
            {/* TODO sort options */}

          </div>
          {searchHotelData?.map((hotel, index)=>(
            <SearchResultCard key={index} hotel={hotel}/>
          ))}

          <div>
            <Pagination page={pagination?.page || 1} pages={pagination?.pages || 1} onPageChange={(page)=>setPage(page)}/>
          </div>
        </div>

    </div>
  )
}

export default Search