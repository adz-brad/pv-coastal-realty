import { getTitleFromSlug, useZoneData } from "@/app/hooks"
import Banner from "@/app/components/Banner"
import Contact from "@/app/components/Contact"
import ShowProperties from "@/app/components/ShowProperties"

const Page = ({ params: { region, zone } }) => {
  
  const title = getTitleFromSlug(zone)
  const regionStr = getTitleFromSlug(region)
  const { regionId, zone: data } = useZoneData(regionStr, title)

  return (
    <>
      <Banner title={title} image={data?.imageUrl} />
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