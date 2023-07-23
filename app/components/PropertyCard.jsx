import Image from "next/image"
import Link from "next/link"
import { MdLocationPin } from 'react-icons/md'
import { usePropertyJSON } from "@/app/hooks"
import JsonLd from "@/app/components/JsonLd"

const PropertyCard = ({ property, i }) => {

  const jsonData = usePropertyJSON({
    title: property?.title,
    address: {
      street: property?.address?.street,
      city: property?.address?.city,
      state: property?.address?.state,
      postalCode: property?.address?.postalCode,
      coordinates: {
        lat: property?.address?.coordinates?.lat,
        lon: property?.address?.coordinates?.lon
      }
    },
    price: property?.price?.current,
    description: property?.description?.en,
    image: property?.images[0]?.seoImage,
    type: property?.type?.en
  })

  return (

    <div key={i} className="shadow-md rounded-md h-[500px] flex flex-col">
      <JsonLd data={jsonData} />
      <div className="relative h-2/3">
        {property.images.length > 0 ?
        <Image 
          src={property.images[0].image} 
          fill={true}
          className="rounded-t-md object-cover"
          alt={property.images[0].alt}
          loading="eager"
          fetchPriority="high"
          priority
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
          <div className="flex flex-col space-y-1">
            <h3 className="font-medium text-lg lg:text-xl">
              {property.title}
            </h3>
            <span className="lg:text-lg text-neutral-500">
              {property.price.current}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <MdLocationPin className="text-sky-500 text-xl min-w-[20px]" />
            <span>
              {property.address.city}, {property.address.state}
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