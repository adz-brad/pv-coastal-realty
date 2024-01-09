import Banner from "@/app/components/Banner"
import { MdOutlineHomeWork, MdLocationPin, MdOutlineBathtub, MdOutlineKingBed } from 'react-icons/md'
import { TbRulerMeasure } from 'react-icons/tb'
import Link from "next/link"
import { usePropertyJSON, useBreadcrumbJSON } from "@/app/hooks"
import JsonLd from "@/app/components/JsonLd"
import { getMlsProperty } from "@/sanity/queries"
import { urlForImage } from "@/sanity/lib/image"

import dynamic from "next/dynamic"

const ImageGallery = dynamic(() => import('@/app/components/ImageGallery'))
const Contact = dynamic(() => import('@/app/components/Contact'))
const Mapbox = dynamic(() => import('@/app/components/Map'))

let USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

//export const revalidate = 592200
export const revalidate = 0

export async function generateMetadata({ params : { property: id }}) {

  const property = await getMlsProperty(parseInt(id))
 
  return {
    title: `${property.title} | PV Coastal Realty`,
    description: `${property.title} (MLV# ${property.mlvId}), located in ${property.city}, ${property.state}, Mexico, is currently listed at $${property.price} USD. Contact PV Coastal Realty today to learn more about this amazing opportunity!`,
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/properties/${id}`,
    },
    other: {
      thumbnail: property?.images?.length && urlForImage(property.images[0])
    },
    twitter: {
      card: 'summary',
      title: `${property?.title} | PV Coastal Realty`,
      description: `${property?.title} (MLV# ${property.mlvId}), located in ${property.city}, ${property.state}, Mexico, is currently listed at $${property.price} USD. Contact PV Coastal Realty today to learn more about this amazing opportunity!`,
      creator: '@pvcoastalrealty',
      images: [{ url: property?.images?.length && urlForImage(property.images[0]) }],
      url: `${process.env.NEXT_SITE_BASEPATH}/properties/${id}`
    },
    openGraph: {
      title: `${property.title} | PV Coastal Realty`,
      description: `${property.title} (MLV# ${property.mlvId}), located in ${property.city}, ${property.state}, Mexico, is currently listed at $${property.price} USD. Contact PV Coastal Realty today to learn more about this amazing opportunity!`,
      type: 'website',
      images: [{ url: property?.images?.length && urlForImage(property.images[0])}],
      url: `${process.env.NEXT_SITE_BASEPATH}/properties/${id}`
    },
  }
}

const Page = async ({ params : { property: id }}) => {

  const property = await getMlsProperty(parseInt(id))
  const price = property?.price?.current ? USDollar.format(property?.price?.current) : null

  const propertyData = usePropertyJSON({
    title: property?.title,
    address: {
      street: property?.address?.street,
      city: property?.address?.city,
      state: property?.address?.state,
      postalCode: property?.address?.postalCode,
      coordinates: {
        lat: property?.address?.coordinates?.lat,
        lon: property?.address?.coordinates?.lng
      }
    },
    price: price,
    description: property?.description?.en,
    image: property?.images?.length && urlForImage(property.images[0]),
    type: property?.type?.en,
    updatedOn: property?.updatedOn,
    createdOn: property?.createdOn,
    url: `https://www.pvcoastalrealty.com/properties/${property?.mlvId}`
  })

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    },
    {
      url: `properties`,
      name: 'Properties'
    },
    {
      url: `properties/${id}`,
      name: property.title
    }
  ])

  return (
    <>
      <JsonLd data={propertyData} />
      <JsonLd data={breadcrumbData} />
      <Banner title={property?.title} image={property?.images?.length && urlForImage(property.images[0])} />
      <div className="flex flex-col mx-auto p-4 md:p-8 xl:px-0 xl:py-16 max-w-screen-2xl space-y-8 xl:space-y-16">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 2xl:space-x-16">
          <div className="lg:w-1/2" title="Property Images">
            <ImageGallery images={property.images} />
          </div>
          <div className="flex flex-col lg:w-1/2 space-y-3">
            <div className="flex flex-col pb-2 border-b space-y-2">
              <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl" title="Property Name">
                {property?.title}
              </h2>
              <span className="text-neutral-500/80 text-xl md:text-2xl" title="Price">
                {price}
              </span>
              <span>MLV# {property.mlvId}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-3">
                <MdLocationPin className="text-2xl text-sky-600 min-w-[20px]"/>
                <a 
                  title="Open in Google Maps"
                  href={`https://www.google.com/maps/search/${property.address?.street?.replace(' ','+')},+${property.address?.city?.replace(' ','+')},+${property.address?.state?.replace(' ','+')}+/@${property.address?.coordinates?.lat},${property.address?.coordinates?.lng}?entry=ttu`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-sm md:text-base hover:underline"
                >
                  {property.address.street}, {property.address.city}, {property.address.state}
                </a>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                <div className="flex flex-col text-lg">
                <h3 className="text-lg font-semibold mb-2">Details</h3>
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
                  <h3 className="text-lg font-semibold -ml-5 mb-2">Features</h3>
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
            </div>
            <p className="lg:text-lg grow pb-4" title="Property Description">
              {property.description.en}
            </p>
            <Link href="/contact" className="button">
            Contact PV Coastal Realty
          </Link>
          </div>

        </div>
        <div className="flex flex-col space-y-8 overflow-hidden">
          <div className="w-full h-[350px] md:h-[450px] lg:h-[600px]">
              <Mapbox 
                title={property.title}
                coordinates={{lat: property.address?.coordinates?.lat, lng: property.address?.coordinates?.lng}} 
                zoom={13} 
              />
          </div>

                <p className="italic text-sm">
                  The listings on this site are part of MLSVallarta’s database and not necessarily the listings of the website owner. They are displayed courtesy of the MLSVallarta API and information provided is deemed to be reliable but not guaranteed.
                </p>
  
        </div>
      </div>
      <Contact />
    </>
  )
}

export default Page