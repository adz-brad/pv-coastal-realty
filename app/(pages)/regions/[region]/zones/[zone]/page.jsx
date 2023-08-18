import { getTitleFromSlug, useZoneData } from "@/app/hooks"
import Banner from "@/app/components/Banner"
import ShowProperties from "@/app/components/ShowProperties"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

import dynamic from "next/dynamic"

const Contact = dynamic(() => import('@/app/components/Contact'))

export async function generateMetadata({ params: { region, zone } }) {
  const title = getTitleFromSlug(zone)
  const regionStr = getTitleFromSlug(region)
  const { zone: data } = useZoneData(regionStr, title)
  return {
    title: `${title} | PV Coastal Realty`,
    description: `Browse PV Coastal Realty's extensive listing database from MLS Vallarta in the ${title} zone of ${regionStr}, Mexico to find your dream home today!`,
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones/${zone}`,
    },
    other: {
      thumbnail: data.imageUrl
    },
    twitter: {
      card: 'summary',
      title: `${title} | PV Coastal Realty`,
      description: `Browse PV Coastal Realty's extensive listing database from MLS Vallarta in the ${title} zone of ${regionStr}, Mexico to find your dream home today!`,
      creator: '@pvcoastalrealty',
      images: [{ url: data.imageUrl }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones/${zone}`,
    },
    openGraph: {
      title: `${title} | PV Coastal Realty`,
      description: `Browse PV Coastal Realty's extensive listing database from MLS Vallarta in the ${title} zone of ${regionStr}, Mexico to find your dream home today!`,
      type: 'website',
      images: [{ url: data.imageUrl }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones/${zone}`,
    },
  }
}

const Page = ({ params: { region, zone } }) => {
  
  const title = getTitleFromSlug(zone)
  const regionStr = getTitleFromSlug(region)
  const { regionId, zone: data } = useZoneData(regionStr, title)

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
      url: `regions/${regionStr}`,
      name: regionStr
    },
    {
      url: `regions/${regionStr}/zones`,
      name: 'Zones'
    },
    {
      url: `regions/${regionStr}/zones/${title}`,
      name: title
    },
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Banner title={title} image={data.imageUrl} />
      <div className="flex flex-col space-y-8 p-4 md:p-8 xl:p-16">
        <p className="lg:text-lg">
          {data?.description}
        </p>
        <h2 className="text-2xl lg:text-4xl font-bold pb-2 border-b ">
          Browse All Properties In {title}
        </h2>
        <ShowProperties region={regionId} zones={[data?.id]} />
      </div>
      <Contact />
    </>
  )
}

export default Page