import Banner from "@/app/components/Banner"
import { MdLocationPin } from 'react-icons/md'
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"
import { getRegions } from "@/sanity/queries"
import { urlForImage } from "@/sanity/lib/image"

import dynamic from "next/dynamic"

const Contact = dynamic(() => import('@/app/components/Contact'))

export const metadata = {
  title: 'Regions | PV Coastal Realty',
  description: 'Browse property listings by region, from Puerto Vallarta and Bucerias to Sayulita, San Pancho and beyond. Find you perfect dream home in paradise today!',
  alternates: {
    canonical: `${process.env.NEXT_SITE_BASEPATH}/regions`,
  },
  other: {
    thumbnail: '/card.jpg'
  },
  twitter: {
    card: 'summary',
    title: 'Regions | PV Coastal Realty',
    description: 'Browse property listings by region, from Puerto Vallarta and Bucerias to Sayulita, San Pancho and beyond. Find you perfect dream home in paradise today!',
    creator: '@pvcoastalrealty',
    images: [`/card.jpg`],
    url: `${process.env.NEXT_SITE_BASEPATH}/regions`
  },
  openGraph: {
    title: 'Regions | PV Coastal Realty',
    description: 'Browse property listings by region, from Puerto Vallarta and Bucerias to Sayulita, San Pancho and beyond. Find you perfect dream home in paradise today!',
    type: 'website',
    images: [{url:`/card.jpg`}],
    url: `${process.env.NEXT_SITE_BASEPATH}/regions`
  },
}

//export const revalidate = 592200
export const revalidate = 0

const Page = async () => {

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    },
    {
      url: `regions`,
      name: 'Regions'
    },
  ])

  const regions = await getRegions()

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Banner title="Regions" />
      <div className="flex flex-col px-4 py-8 md:p-8">
        <h2 className="text-2xl md:text-4xl font-bold pb-2 border-b">
          Browse Properties By Region
        </h2>
        <ul className="flex flex-col space-y-12 py-8">
          {regions.map((region, i) => {
            return (
              <li key={i} className="flex flex-col lg:flex-row space-y-4 lg:space-x-8 lg:space-y-0">
                    <div className="relative h-[350px] lg:h-auto lg:w-1/2">
                    <Image
                        src={urlForImage(region.image)} 
                        fill={true}
                        className="rounded-l-md object-cover"
                    />
                    </div>
                <div className="flex flex-col lg:w-1/2 lg:space-y-2">
                  <div className="flex flex-col grow">
                      <h3 className="font-medium text-3xl md:text-4xl border-b pb-2 mb-2">
                        {region.title}
                      </h3>
                        <p className="hidden lg:block">
                            {region.description}
                        </p>
                    </div>
                    <div className="pb-4 lg:py-0 space-y-2">
                    <span className="font-medium">
                      Choose A Zone To View Properties:
                    </span>
                      <ul>
                        {region.zones.map((zone) => {
                          return (
                            <li 
                              key={zone.title}
                              className="flex flex-row items-center space-x-2"
                            >
                              <MdLocationPin className="text-lg text-sky-500" />
                              <Link
                                href={`/regions/${slugify(region.title, { lower: true })}/zones/${slugify(zone.title, { lower: true })}`}
                                className="hover:text-sky-600 hover:font-medium"
                              >
                                {zone.title}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <Link href={`/regions/${slugify(region.title, { lower: true })}`} className="button">
                    Properties in {region.title}
                  </Link>
                  </div>         
              </li>
            )
          })}
        </ul>
      </div>
        <Contact />
    </>
  )

}

export default Page