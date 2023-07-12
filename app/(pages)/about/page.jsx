import Banner from "@/app/components/Banner"
import Contact from "@/app/components/Contact"
import { agents, agency } from "@/data"
import Image from "next/image"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

export const metadata = {
  title: 'The Agency | PV Coastal Realty',
  description: 'Learn more about your PV Coastal Realty agents, specialists in buying & selling properties all over Banderas Bay, specifically in the areas surrounding Puerto Vallarta and Riviera Nayarit. Find you perfect dream home in paradise today!',
  alternates: {
    canonical: `${process.env.NEXT_SITE_BASEPATH}/about`,
  },
  twitter: {
    card: 'summary',
    title: 'The Agency | PV Coastal Realty',
    description: 'Learn more about your PV Coastal Realty agents, specialists in buying & selling properties all over Banderas Bay, specifically in the areas surrounding Puerto Vallarta and Riviera Nayarit.',
    creator: '@pvcoastalrealty',
    images: [`/pv-coastal-realty-logo.png`],
    url: `${process.env.NEXT_SITE_BASEPATH}/about`
  },
  openGraph: {
    title: 'The Agency | PV Coastal Realty',
    description: 'Learn more about your PV Coastal Realty agents, specialists in buying & selling properties all over Banderas Bay, specifically in the areas surrounding Puerto Vallarta and Riviera Nayarit.',
    type: 'website',
    images: [{url:`/pv-coastal-realty-logo.png`}],
    url: `${process.env.NEXT_SITE_BASEPATH}/about`
  },
}

const Page = () => {

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    },
    {
      url: `about`,
      name: 'Agency'
    }
  ])

  return (
    <>
    <JsonLd data={breadcrumbData} />
    <Banner title="About Us"/>
    <div className="flex flex-col space-y-8 p-4 md:p-8 lg:py-16">
      <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
          About Us
      </h2>
      <p>
        {agency.description}
      </p>
      <h3 className="pb-2 border-b font-semibold text-2xl">
        Owner / Broker
      </h3>
      <ul className="flex flex-col space-y-16 lg:space-y-8">
            <li 
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8"
            >
              <div className="relative rounded-full min-w-[300px] h-[300px] lg:min-w-[250px] lg:h-[250px] shadow-lg">
                <Image
                  className="object-cover rounded-full shadow-lg"
                  src={agents[0].imageUrl ? agents[0].imageUrl : './avatar.webp'}
                  alt={`PV Coastal Realty: Meet Owner / Broker ${agents[0].name}`}
                  fill={true}
                />
              </div>
              <div className="flex flex-col grow space-y-4">
                <h3 className="text-2xl font-semibold">
                  {agents[0].name}
                </h3>
                <p>
                  {agents[0].description}
                </p>
              </div>
            </li>
      </ul>
      <h3 className="pb-2 border-b font-semibold text-2xl">
        Our Agents
      </h3>
      <ul className="flex flex-col space-y-16 lg:space-y-8">
            <li 
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8"
            >
              <div className="relative rounded-full min-w-[300px] h-[300px] lg:min-w-[250px] lg:h-[250px] shadow-lg">
                <Image
                  className="object-cover rounded-full shadow-lg"
                  src={agents[1].imageUrl ? agents[1].imageUrl : './avatar.webp'}
                  alt={`PV Coastal Realty: Meet Agent ${agents[1].name}`}
                  fill={true}
                />
              </div>
              <div className="flex flex-col grow space-y-4">
                <h3 className="text-2xl font-semibold">
                  {agents[1].name}
                </h3>
                <p>
                  {agents[1].description}
                </p>
              </div>
            </li>
      </ul>
    </div>
    <Contact />
  </>
  )
}

export default Page