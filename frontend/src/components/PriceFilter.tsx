import React from 'react'

export type Props = {
  selectedMaxPrice?: number;
  onChange: (value?: number) => void;
}

function PriceFilter({selectedMaxPrice, onChange}: Props) {



  return (
    <div>
      <h4 className='text-md font-semibold mb-2'> Max Price</h4>
      <select className='p-2 border rounded-md w-full' name="" id="" value={selectedMaxPrice} onChange={(event)=>onChange(event.target.value ? parseInt(event.target.value) : undefined)}>
      <option value="">Select Max Price</option>
      {[ 300, 500, 800, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 8000, 10000, 20000, 30000, 40000, 50000].map((price)=>{
        return (
          <option value={price}>{price}</option>
        )
      })}
      </select>
    </div>
  )
}

export default PriceFilter