import { getTitleFromSlug } from "@/app/hooks"
import Banner from "@/app/components/Banner"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"
import Search from "@/app/components/InstantSearch"

import dynamic from "next/dynamic"
import { getZone, getRegionId } from "@/sanity/queries"
import { urlForImage } from "@/sanity/lib/image"

const Contact = dynamic(() => import('@/app/components/Contact'))

export async function generateMetadata({ params: { region, zone } }) {
  const title = getTitleFromSlug(zone)
  const data = await getZone(title)
  return {
    title: `${data.title} | PV Coastal Realty`,
    description: `Browse PV Coastal Realty's extensive listing database from MLS Vallarta in the ${data.title} zone of ${data.region}, Mexico to find your dream home today!`,
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones/${zone}`,
    },
    other: {
      thumbnail: urlForImage(data.image)
    },
    twitter: {
      card: 'summary',
      title: `${data.title} | PV Coastal Realty`,
      description: `Browse PV Coastal Realty's extensive listing database from MLS Vallarta in the ${data.title} zone of ${data.region}, Mexico to find your dream home today!`,
      creator: '@pvcoastalrealty',
      images: [{ url: urlForImage(data.image) }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones/${zone}`,
    },
    openGraph: {
      title: `${data.title} | PV Coastal Realty`,
      description: `Browse PV Coastal Realty's extensive listing database from MLS Vallarta in the ${data.title} zone of ${data.region}, Mexico to find your dream home today!`,
      type: 'website',
      images: [{ url: urlForImage(data.image) }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones/${zone}`,
    },
  }
}

const Page = async ({ params: { region, zone } }) => {
  
  const title = getTitleFromSlug(zone)
  const data = await getZone(title)
  const regionId = await getRegionId(title)

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
      name: data?.region
    },
    {
      url: `regions/${region}/zones`,
      name: 'Zones'
    },
    {
      url: `regions/${region}/zones/${zone}`,
      name: data?.title
    },
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Banner title={data?.title} image={data?.imageUrl} />
      <div className="flex flex-col space-y-8 p-4 md:p-8 xl:p-16">
        <p className="lg:text-lg">
          {data?.description}
        </p>
        <h2 className="text-2xl lg:text-4xl font-bold pb-2 border-b ">
          Browse All Properties In {data?.title}
        </h2>
        <Search restrict={["regionId", "zoneId"]} filters={`regionId:${regionId} AND zoneId:${data?.id}`} />

      </div>
      <Contact />
    </>
  )
}

export default Page