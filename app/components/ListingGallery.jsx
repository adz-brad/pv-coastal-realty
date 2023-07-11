import { getProperties } from "../mls"
import PropertyCard from "./PropertyCard"
import Link from "next/link"

const ListingGallery = async ({ title, path, params }) => {

  const properties = await getProperties(params)

  return (

    <div className="flex flex-col px-8 py-8">
      <div className="flex flex-row pb-2 border-b space-x-4">
        <h2 className="text-4xl font-bold">
          {title}
        </h2>
        <Link 
          href={path}
          className="self-end hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 py-8">
        {properties.map((property, i) => {
          return <PropertyCard key={i} property={property} i={i} />
        })}
      </div>
    </div>
    
  )
}

export default ListingGallery