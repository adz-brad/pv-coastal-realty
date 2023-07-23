import Banner from "@/app/components/Banner"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
import { getTitleFromSlug, useRegionData } from "@/app/hooks"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

import dynamic from "next/dynamic"

const Contact = dynamic(() => import('@/app/components/Contact'))

export const revalidate = 86400

export async function generateMetadata({ params: { region } }) {
  const title = getTitleFromSlug(region)
  const data = useRegionData(title)
  const zoneString = data.zones.map((zone, i) => {
    if(i === data.zones.length - 1){ return ` & ${zone.title}.`}
    else { return ` ${zone.title}`}
  })
  return {
    title: `${title} | PV Coastal Realty`,
    description: `Browse listings in the ${title} region, featuring properties in:${zoneString}`,
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones`,
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
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones`
    },
    openGraph: {
      title: `${title} | PV Coastal Realty`,
      description: `Browse listings in the ${title} region, featuring properties in:${zoneString}`,
      type: 'website',
      images: [{ url: data.imageUrl }],
      url: `${process.env.NEXT_SITE_BASEPATH}/regions/${region}/zones`
    },
  }
}

const Page = ({ params: { region }}) => {

  const str = getTitleFromSlug(region)
  const data = useRegionData(str)

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
      url: `regions/${str}`,
      name: str
    },
    {
      url: `regions/${str}/zones`,
      name: 'Zones'
    },
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Banner title={`${str} Zones`} image={data.imageUrl} placeholder={data.imageUrl}/>
      <div className="flex flex-col p-4 lg:p-8">
        <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
          Browse {str} Properties By Zone
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {data.zones.map((zone, i) => {
            return (
              <li key={i} className="flex flex-col h-[350px]">
                    <div className="relative grow">
                    <Image 
                        src={zone.imageUrl ? zone.imageUrl : '/pv-coastal-header.webp'} 
                        fill={true}
                        className="rounded-t-md object-cover"
                        alt={`PV Coastal Realty: ${zone.title} Zone`}
                        placeholder="blur"
                        blurDataURL={zone.imageUrl ? zone.imageUrl : '/pv-coastal-header.webp'}
                    />
                    </div>




                  
                    <Link 
                    href={`/regions/${region}/zones/${slugify(zone.title, { lower: true })}`}
                    className="button"
                  >
                    {zone.title}
                  </Link>
    
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