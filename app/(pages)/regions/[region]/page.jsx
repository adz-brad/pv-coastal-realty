import Banner from "@/app/components/Banner"
import { getTitleFromSlug } from "@/app/hooks"
import Contact from "@/app/components/Contact"
import ShowProperties from "@/app/components/ShowProperties"
import { useRegionData, useRegionParams } from "@/app/hooks"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"

const Page = ({ params: { region } }) => {
  
  const title = getTitleFromSlug(region)
  const data = useRegionData(title)
  const params = useRegionParams(data)

  return (
    <>
      <Banner title={title} image={data.imageUrl} />
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