import Banner from "@/app/components/Banner"
import { regions } from "@/data"
import { MdLocationPin } from 'react-icons/md'
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
import Contact from "@/app/components/Contact"

const Page = () => {

  return (
    <>
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
                        src={region.imageUrl} 
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
                              key={zone.id}
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