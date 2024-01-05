import Image from "next/image"
import Link from "next/link"
import { MdLocationPin } from 'react-icons/md'
import { usePropertyJSON } from "@/app/hooks"
import JsonLd from "@/app/components/JsonLd"
import { urlForImage } from "@/sanity/lib/image"

const SearchCard = ({ hit: property }) => {

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const price = property?.price?.current ? USDollar.format(property?.price?.current) : null

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
    price: price,
    description: property?.description?.en,
    image: property?.images?.length && urlForImage(property?.images[0]),
    type: property?.type?.en
  })

  return (

    <div key={property.mlvId} className={`shadow-md rounded-md h-[500px] flex flex-col`}>
      <JsonLd data={jsonData} />
      <div className="relative h-2/3">
        {property?.images?.length > 0 ?
        <Image  
          loading="eager"
          src={urlForImage(property.images[0])} 
          fill={true}
          className="rounded-t-md object-cover"
          alt={property.images[0].alt}
          priority
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
              {price}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <MdLocationPin className="text-sky-500 text-xl min-w-[20px]" />

                <span>
                  {property?.address?.city && property.address.city}
                  {property?.address?.city && property.address?.state && ', '}
                  {property?.address?.state && property.address.state}
                </span>
            
          </div>

        </div>
        <Link 
          href={`/properties/${property.mlvId}`}
          className="button"
        >
          View Property
        </Link>
      </div>
    </div>

  )
}

export default SearchCard