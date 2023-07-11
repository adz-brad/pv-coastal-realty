import { popularRegions } from "@/data"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"

const Regions = () => {

  return (
    <div className="flex flex-col px-4 lg:px-8">
      <div className="flex flex-row pb-2 border-b space-x-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Popular Areas
        </h2>
        <Link 
          href="/regions"
          className="self-end hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col py-8 space-y-8 xl:space-y-16">
        {popularRegions.map((region, i) => {
          return (
            <div key={region.id} className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
                <div className="relative h-[400px] lg:w-1/2">
                <Image 
                    src={region.imageUrl} 
                    fill={true}
                    className="rounded-l-md object-cover"
                    alt={`PV Coastal Realty: ${region.title} Region`}
                />
                </div>
            <div className="flex flex-col lg:w-1/2">
              <div className="flex flex-col grow">
                  <h3 className="font-medium text-2xl md:text-3xl lg:text-4xl border-b pb-2">
                    {region.title}
                  </h3>
                    <p className="my-4 lg:my-auto">
                        {region.description}
                    </p>
                </div>
                <Link 
                href={`/regions/${slugify(region.region, { lower: true })}/zones/${slugify(region.title, { lower: true })}`}
                className="button"
              >
                Properties in {region.title}
              </Link>
              </div>         
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Regions