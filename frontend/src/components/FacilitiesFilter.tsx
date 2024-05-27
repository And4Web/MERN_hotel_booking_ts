import React from "react";
import { hotelFacilities } from "../config/hotel-options-config";

export type Props = {
  selectedFacilitiesTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FacilitiesFilter({selectedFacilitiesTypes, onChange}: Props) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((type)=>{
        return (
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" value={type} checked={selectedFacilitiesTypes.includes(type)}
            onChange={onChange}
            />
            <span>{type}</span>
          </label>
        )
      })}
    </div>
  )
}

export default FacilitiesFilter;