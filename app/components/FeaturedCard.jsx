import Image from "next/image"
import { MdLocationPin } from 'react-icons/md'
import FeaturesList from "./FeaturesList"
import Link from "next/link"

const FeaturedCard = ({ property }) => {

  return (
    <div id={property.id} className="carousel-item w-full flex flex-col-reverse lg:flex-row lg:space-x-8 py-4 lg:py-8" >
      <div className="flex flex-col grow lg:w-1/2 my-4 lg:my-0">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col lg:space-x-2 space-y-2 lg:space-y-0 lg:flex-row">
            <h3 className="font-medium text-2xl md:text-3xl">
              {property.title}
            </h3>
            <span className="text-xl md:text-2xl lg:self-end text-neutral-500">
              {property.price.current}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <MdLocationPin className="text-sky-600 text-2xl" />
            <span className="text-lg">
              {property.address.city}, {property.address.state}
            </span>
          </div>
        </div>
        <div className="hidden lg:flex flex-col space-y-2 my-2 lg:my-auto">
          {property.description.en}
        </div>
        { property.features &&
          <div className="flex flex-col space-y-2 my-4 lg:my-auto">
            <span className="text-2xl">Features</span>
            <FeaturesList features={property.features} />
          </div>
        }
        <Link 
          href={`/properties/${property.id}`} 
          className="button"
        >
            View Property
        </Link>
      </div>
      <div className="relative lg:w-1/2 h-[350px] lg:min-h-[500px]">
        <Image 
          src={property.images[0].url} 
          fill={true}
          className="rounded-r-md object-cover"
          alt={property.images[0].alt}
          placeholder="blur"
          blurDataURL={property.images[0].placeholder}
        />
      </div>
    </div> 
  )
}

export default FeaturedCard