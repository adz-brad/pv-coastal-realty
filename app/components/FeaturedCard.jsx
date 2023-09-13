import Image from "next/image"
import { MdLocationPin } from 'react-icons/md'
import { MdOutlineBathtub, MdOutlineKingBed, MdOutlineHomeWork } from 'react-icons/md'
import { TbRulerMeasure } from 'react-icons/tb'
import Link from "next/link"
import { usePropertyJSON } from "@/app/hooks"
import JsonLd from "@/app/components/JsonLd"

const FeaturedCard =  ({ property, current }) => {

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
    image: property?.images[0].seoImage,
    type: property?.type?.en
  })

  return (
    <div id={property?.mlvId} className={`w-full flex-col-reverse lg:flex-row lg:space-x-8 py-4 lg:py-8 ${current === property?.mlvId ? 'flex' : 'hidden'}`} >
      <JsonLd data={jsonData} />
      <div className="flex flex-col grow lg:w-1/2 my-4 lg:my-0">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col lg:space-x-2 space-y-2">
            <h3 className="font-medium text-2xl md:text-3xl">
              {property?.title}
            </h3>
            <span className="text-xl md:text-2xl text-neutral-500">
              {property?.price.current}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <MdLocationPin className="text-sky-600 text-2xl" />
            <span className="text-lg">
              {property?.address.city}, {property?.address.state}
            </span>
          </div>
        </div>
        <div className="hidden lg:flex flex-col space-y-2 my-2 lg:my-auto">
          {property?.description.en}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                <div className="flex flex-col text-lg">
                <h3 className="text-lg lg:text-xl font-semibold mb-2">Details</h3>
                  {property?.type?.en &&
                    <div className="flex flex-row items-center space-x-2" title="Property Type">
                      <MdOutlineHomeWork className="text-2xl" />
                      <span>
                        {property.type.en}
                      </span>
                    </div>
                  }
                  <ul title="Property Details">
                  {property?.bedrooms > 0 &&
                    <li className="flex flex-row items-center text-lg space-x-2" title="Bedrooms">
                      <MdOutlineKingBed className="text-2xl"/>
                      <span>
                        {property?.bedrooms} Bedrooms
                      </span>
                    </li> }
                    {property?.bathrooms > 0 &&
                    <li className="flex flex-row items-center text-lg space-x-2" title="Bathrooms">
                      <MdOutlineBathtub className="text-2xl" />
                      <span>
                        {property?.bathrooms} Bathrooms
                      </span>
                    </li> }
                    {property?.constructionSize > 0 &&
                    <li className="flex flex-row items-center text-lg space-x-2" title="Construction Size (M2)">
                      <TbRulerMeasure className="text-2xl" />
                      <span>
                        {property?.constructionSize} Construction Size (M2)
                      </span>
                    </li> }
                  </ul>
                </div>
                {property?.ammenities?.length > 0 &&
                <div title="Property Features" className="flex flex-col p-4 lg:py-0">
                  <h3 className="text-lg lg:text-xl font-semibold -ml-5 mb-2">Features</h3>
                  <ul className="grid grid-cols-2 list-disc">
                    {property?.ammenities?.map((item, i) => {
                      return (
                        <li 
                          key={i} 
                          className=""
                        >
                          {item.en}
                        </li>
                      )
                    })}
                  </ul>
                </div>}
              </div>
            
        
        <Link 
          href={`/properties/${property?.mlvId}`} 
          className="button"
        >
            View Property
        </Link>
      </div>
      <div className="relative lg:w-1/2 h-[350px] lg:min-h-[600px]">
        <Image
          loading="eager"
          priority
          fetchPriority="high"
          src={property?.images[0].seoImage} 
          fill={true}
          className="rounded-r-md object-cover"
          alt={property?.images[0].alt}
        />
      </div>
    </div> 
  )
}

export default FeaturedCard