import Image from "next/image"
import Link from "next/link"
import { MdLocationPin } from 'react-icons/md'

const PropertyCard = ({ property, i }) => {
  return (

    <div key={i} className="shadow-md rounded-md h-[500px] flex flex-col">
      <div className="relative h-2/3">
        {property.images.length > 0 ?
        <Image 
          src={property.images[0].url} 
          fill={true}
          className="rounded-t-md object-cover"
          alt={property.images[0].alt}
          placeholder="blur"
          blurDataURL={property.images[0].placeholder}
        />
        :
        <Image 
          src="/img-placeholder.webp"
          fill={true}
          className="rounded-t-md object-cover"
          alt="PV Coastal Realty: No Image Available"
        />
        }
      </div>
      <div className="flex flex-col grow">
        <div className="flex flex-col space-y-2 py-4 md:px-4 my-auto">
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
            <h3 className="font-medium text-lg lg:text-xl">
              {property.title}
            </h3>
            <span className="lg:text-lg lg:self-end text-neutral-500">
              {property.price.current}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <MdLocationPin className="text-sky-500 text-xl" />
            <span className="text-sm md:text-base">
              {property.address.street}, {property.address.city}, {property.address.state}
            </span>
          </div>
        </div>
        <Link 
          href={`/properties/${property.id}`}
          className="button"
        >
          View Property
        </Link>
      </div>
    </div>

  )
}

export default PropertyCard