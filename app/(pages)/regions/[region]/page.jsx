import Banner from "@/app/components/Banner"
import { getTitleFromSlug } from "@/app/hooks"
import { useRegionData, useRegionParams } from "@/app/hooks"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

import dynamic from "next/dynamic"
import Search from "@/app/components/InstantSearch"
import { getRegion } from "@/sanity/queries"
import { urlForImage } from "@/sanity/lib/image"

const Contact = dynamic(() => import('@/app/components/Contact'))

export const revalidate = 592200

export async function generateMetadata({ params: { region } }) {
  const title = getTitleFromSlug(region)
  const data = await getRegion(title)
  const zoneString = data.zones.map((zone, i) => {
    if(i === data.zones.length - 1){ return ` & ${zone.title}.`}
    else { return ` ${zone.title},`}
  })
  return {
    title: `${data.title} | PV Coastal Realty`,
    description: `Browse PV Coastal Realty's extensive listing database from MLS Vallarta in the ${data.title} region of Mexico, featuring properties in:${zoneString}`,
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}`,
    },
    other: {
      thumbnail: urlForImage(data.image)
    },
    twitter: {
      card: 'summary',
      title: `${data.title} | PV Coastal Realty`,
      description: `Browse listings in the ${data.title} region, featuring properties in:${zoneString}`,
      creator: '@pvcoastalrealty',
      images: [{ url: urlForImage(data.image) }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}`
    },
    openGraph: {
      title: `${data.title} | PV Coastal Realty`,
      description: `Browse listings in the ${data.title} region, featuring properties in:${zoneString}`,
      type: 'website',
      images: [{ url: urlForImage(data.image) }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}`
    },
  }
}

const Page = async ({ params: { region } }) => {

  const title = getTitleFromSlug(region)
  const data = await getRegion(title)
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
      url: `regions/${region}`,
      name: title
    }
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Banner title={data.title} image={urlForImage(data.image)} />
      <div className="flex flex-col space-y-8 p-4 md:p-8 xl:p-16">
        <p className="lg:text-lg">
          {data.description}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b ">
          Zones in {data.title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.zones.map((zone) => {
          return (
            <div key={zone.title} className="flex flex-col space-y-4">
                <div className="relative min-h-[300px]">
                <Image 
                    src={urlForImage(zone.image)} 
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
                href={`/regions/${region}/zones/${slugify(zone.title, { lower: true })}`}
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
          Browse All {data.title} Properties
        </h2>
        <Search restrict={["regionId"]} filters={`regionId:${params.regionId}`} />
      </div>
      <Contact />
    </>
  )
}

export default Page