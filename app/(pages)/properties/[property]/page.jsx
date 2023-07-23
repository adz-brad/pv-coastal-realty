import Banner from "@/app/components/Banner"
import { getProperty, preload } from "@/app/mls"
import { MdOutlineHomeWork, MdLocationPin } from 'react-icons/md'
import FeaturesList from "@/app/components/FeaturesList"
import Link from "next/link"
import { usePropertyJSON, useBreadcrumbJSON } from "@/app/hooks"
import JsonLd from "@/app/components/JsonLd"

import dynamic from "next/dynamic"

const ImageGallery = dynamic(() => import('@/app/components/ImageGallery'))
const Contact = dynamic(() => import('@/app/components/Contact'))
const Mapbox = dynamic(() => import('@/app/components/Map'))

export const revalidate = 86400

export async function generateMetadata({ params : { property: id }}) {
  preload(id)
  const property = await getProperty(id)

  return {
    title: `${property.title} | PV Coastal Realty`,
    description: `${property.title} (MLV# ${property.mlvId}), located in ${property.city}, ${property.state}, Mexico, is currently listed at $${property.price} USD. Contact PV Coastal Realty today to learn more about this amazing opportunity!`,
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/properties/${id}`,
    },
    other: {
      thumbnail: property.images[0].single
    },
    twitter: {
      card: 'summary',
      title: `${property.title} | PV Coastal Realty`,
      description: `${property.title} (MLV# ${property.mlvId}), located in ${property.city}, ${property.state}, Mexico, is currently listed at $${property.price} USD. Contact PV Coastal Realty today to learn more about this amazing opportunity!`,
      creator: '@pvcoastalrealty',
      images: [{ url: property.images[0].single }],
      url: `${process.env.NEXT_SITE_BASEPATH}/properties/${id}`
    },
    openGraph: {
      title: `${property.title} | PV Coastal Realty`,
      description: `${property.title} (MLV# ${property.mlvId}), located in ${property.city}, ${property.state}, Mexico, is currently listed at $${property.price} USD. Contact PV Coastal Realty today to learn more about this amazing opportunity!`,
      type: 'website',
      images: [{ url: property.images[0].single }],
      url: `${process.env.NEXT_SITE_BASEPATH}/properties/${id}`
    },
  }
}

const Page = async ({ params : { property: id }}) => {

  preload(id)
  const property = await getProperty(id)

  const propertyData = usePropertyJSON({
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
    image: property?.images[0].single,
    type: property?.type?.en
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
      <Banner title={property?.title} image={property.images[0]?.hero}  placeholder={property.images[0]?.placeholder}/>
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
                {property?.price?.current}
              </span>
              <span>MLV# {property.mlvId}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center space-x-3">
                <MdLocationPin className="text-2xl text-sky-600 min-w-[20px]"/>
                <a 
                  title="Open in Google Maps"
                  href={`https://www.google.com/maps/search/${property.address?.street?.replace(' ','+')},+${property.address?.city?.replace(' ','+')},+${property.address?.state?.replace(' ','+')}+/@${property.address?.coordinates?.lat},${property.address?.coordinates?.lon}?entry=ttu`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="text-sm md:text-base hover:underline"
                >
                  {property.address.street}, {property.address.city}, {property.address.state}
                </a>
              </div>
              <div className="flex flex-col text-lg my-6">
                {property?.type?.en &&
                  <div className="flex flex-row items-center space-x-2" title="Property Type">
                    <MdOutlineHomeWork className="text-2xl" />
                    <span>
                      {property.type.en}
                    </span>
                  </div>
                }
                {property?.features && 
                  <FeaturesList features={property.features} />
                }
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
                coordinates={{lat: property.address?.coordinates?.lat, lng: property.address?.coordinates?.lon}} 
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