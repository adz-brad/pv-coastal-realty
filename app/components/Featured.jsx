import { getFeatured } from "../mls"
import Link from "next/link"
import FeaturedCarousel from "./FeaturedCarousel"

const Featured = async () => {

  const properties = await getFeatured(8)

  return (
    <div id="featured-properties" className="flex flex-col px-4 lg:px-8 py-16">
      <h2 className="pb-2 border-b text-3xl md:text-4xl font-bold">
        Featured Properties
      </h2>
      <FeaturedCarousel properties={properties} />
    </div>
  )
}

export default Featured