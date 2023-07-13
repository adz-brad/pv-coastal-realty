import Banner from "@/app/components/Banner"
import { getTitleFromSlug } from "@/app/hooks"
import ShowProperties from "@/app/components/ShowProperties"
import { useRegionData, useRegionParams } from "@/app/hooks"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

import dynamic from "next/dynamic"

const Contact = dynamic(() => import('@/app/components/Contact'))

export const revalidate = 3600

export async function generateMetadata({ params: { region } }) {
  const title = getTitleFromSlug(region)
  const data = useRegionData(title)
  const zoneString = data.zones.map((zone, i) => {
    if(i === data.zones.length - 1){ return ` & ${zone.title}.`}
    else { return ` ${zone.title}`}
  })
  return {
    title: `${title} | PV Coastal Realty`,
    description: `Browse PV Coastal Realty's extensive listing database from MLS Vallarta in the ${title} region of Mexico, featuring properties in:${zoneString}`,
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}`,
    },
    other: {
      thumbnail: data.imageUrl
    },
    twitter: {
      card: 'summary',
      title: `${title} | PV Coastal Realty`,
      description: `Browse listings in the ${title} region, featuring properties in:${zoneString}`,
      creator: '@pvcoastalrealty',
      images: [{ url: data.imageUrl }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}`
    },
    openGraph: {
      title: `${title} | PV Coastal Realty`,
      description: `Browse listings in the ${title} region, featuring properties in:${zoneString}`,
      type: 'website',
      images: [{ url: data.imageUrl }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}`
    },
  }
}

const Page = ({ params: { region } }) => {
  
  const title = getTitleFromSlug(region)
  const data = useRegionData(title)
  const params = useRegionParams(data)

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    },
    {
      url: `regions`,
      name: 'Regions'
    },
    {
      url: `regions/${title}`,
      name: title
    }
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Banner title={title} image={data.imageUrl} placeholder={data.imageUrl} />
      <div className="flex flex-col space-y-8 p-4 md:p-8 xl:p-16">
        <p className="lg:text-lg">
          {data.description}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b ">
          Zones in {title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.zones.map((zone) => {
          return (
            <div key={zone.id} className="flex flex-col space-y-4">
                <div className="relative min-h-[300px]">
                <Image 
                    src={zone.imageUrl} 
                    fill={true}
                    className="rounded-l-md object-cover"
                    alt={`PV Coastal Realty: ${zone.title} Zone`}
                />
                </div>
            <div className="flex flex-col grow">
              <div className="flex flex-col grow">
                  <h3 className="font-medium text-2xl lg:text-3xl border-b pb-2">
                    {zone.title}
                  </h3>
                    <p className="hidden lg:block my-auto py-4">
                        {zone.description}
                    </p>
                </div>
                <Link 
                href={`/regions/${slugify(title, { lower: true })}/zones/${slugify(zone.title, { lower: true })}`}
                className="button mt-auto"
              >
                Properties in {zone.title}
              </Link>
              </div>         
          </div>
          )
        })}
      </div>
        <h2 className="text-3xl lg:text-4xl font-bold pb-2 border-b ">
          Browse All {title} Properties
        </h2>
        <ShowProperties region={params.regionId} zones={params.zoneIds} />
      </div>
      <Contact />
    </>
  )
}

export default Page