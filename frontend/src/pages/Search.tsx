import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client';
import React, { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";


function Search() {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);

  const [ selectedStars, setSelectedStars] = useState<string[]>([]);
  const [ selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [ selectedFacilitiesTypes, setSelectedFacilitiesTypes] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOptions, setSortOptions] = useState<string>("");
  
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    starRatings: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilitiesTypes,
    maxPrice: selectedPrice?.toString(),
    sortOptions,
  }

  const {data} = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))
  
  const searchHotelData = data?.response?.data;
  const pagination = data?.response?.pagination;

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) => event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating));
  }

  const handleHotelTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes)=>event.target.checked ? [...prevHotelTypes, hotelType] : prevHotelTypes.filter((type)=> type !== hotelType))
  }

  const handleFacilitiesType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facilityType = event.target.value;

    setSelectedFacilitiesTypes((prevFacilities)=>event.target.checked ? [...prevFacilities, facilityType] : prevFacilities.filter(facility=> facility !== facilityType));
  }

  const handlePriceChange = (value?: number) => {
    setSelectedPrice(value);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5 xs:mx-1 md:mx-2 lg:mx-3">
      <div className="rounded-lg border border-slate-300 md:sticky top-10 p-5 h-fit">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
          {/* FILTERS */}
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange}/>
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypes}/>
          <FacilitiesFilter selectedFacilitiesTypes={selectedFacilitiesTypes} onChange={handleFacilitiesType}/>
          <PriceFilter selectedMaxPrice={selectedPrice} onChange={handlePriceChange}/>
        </div>
      </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {pagination?.total} hotels found {search?.destination ? `in ${search?.destination} ` : ""}
            </span>
            {/*  sort options */}
            <select className="border rounded p-2" value={sortOptions} onChange={(event)=>setSortOptions(event.target.value)}>
              <option value="">Sort by</option>
              <option value="starRating">Star ratings</option>
              <option value="pricePerNightAsc">Price per night - Low to High</option>
              <option value="pricePerNightDesc">Price per night - High to Low</option>
            </select>
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