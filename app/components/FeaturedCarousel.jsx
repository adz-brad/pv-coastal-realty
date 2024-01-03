'use client'

import FeaturedCard from "./FeaturedCard"
import { useState } from "react"

const FeaturedCarousel = ({ properties }) => {
    const [ current, setCurrent ] = useState(properties[0]?.mlvId)
  return (
    <>
    <div className="w-full">
    {properties?.map((property) => {
      return <FeaturedCard key={property?.mlvId} current={current} property={property} />
    })}
  </div> 
  <div className="flex justify-center w-full mt-4 gap-2">
  {properties?.map((property, i) => {
    return <button key={i} onClick={() => setCurrent(property?.mlvId)} className={`flex flex-col items-center justify-center font-medium ${current === property.mlvId ? 'bg-sky-700 text-zinc-50' : 'bg-zinc-100' } h-10 w-10 text-lg rounded-sm shadow-md hover:brightness-125`}>{i+1}</button> 
  })}
  </div>
  </>
  )
}

export default FeaturedCarousel