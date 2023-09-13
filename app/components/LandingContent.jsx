import { agency } from "@/data"
import Link from "next/link"
import Image from "next/image"

const LandingContent = () => {
  return (
<div className="flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-8 px-4 py-8 md:px-8 lg:py-16">
        <div className="flex flex-col space-y-8 lg:space-y-auto lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
            Vallarta Real Estate Experts
          </h2>
          <p className="lg:mb-auto lg:grow">
            {agency.description}
          </p>
          <Link href="/contact" className="button lg:mt-auto">
            Contact PV Coastal Realty Today!
          </Link>
        </div>
        <div className="relative hidden lg:block lg:w-1/2 h-auto min-h-[350px] lg:min-h-[400px]">
          <Image 
            src="/beach-family.webp"
            fill={true}
            className="rounded-r-md rounded-l-sm object-cover"
            alt="Contact PV Coastal Realty today and let us guide you in turning your property dreams into reality!"
          />
        </div>
      </div>
  )
}

export default LandingContent