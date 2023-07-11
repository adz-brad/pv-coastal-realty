import Banner from "@/app/components/Banner"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
import Contact from "@/app/components/Contact"
import { getTitleFromSlug, useRegionData } from "@/app/hooks"

const Page = ({ params: { region }}) => {

  const str = getTitleFromSlug(region)
  const data = useRegionData(str)

  return (
    <>
      <Banner title={`${str} Zones`} />
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