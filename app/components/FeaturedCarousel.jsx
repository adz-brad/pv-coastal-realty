'use client'

import FeaturedCard from "./FeaturedCard"
import { useState } from "react"

const FeaturedCarousel = ({ properties }) => {
    const [ current, setCurrent ] = useState(properties[0])
  return (
    <>
    <div className="w-full">
    <FeaturedCard property={current} />
  </div> 
  <div className="flex justify-center w-full mt-4 gap-2">
  {properties?.map((property, i) => {
    return <button onClick={() => setCurrent(property)} className={`flex flex-col items-center justify-center font-medium ${current.id === property.id ? 'bg-sky-700 text-zinc-50' : 'bg-zinc-100' } h-10 w-10 text-lg rounded-sm shadow-md hover:brightness-125`}>{i+1}</button> 
  })}
  </div>
  </>
  )
}

export default FeaturedCarousel