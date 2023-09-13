import Banner from "@/app/components/Banner"
import Link from "next/link"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

import dynamic from "next/dynamic"
import Search from "@/app/components/InstantSearch"

const Contact = dynamic(() => import('@/app/components/Contact'))

export const metadata = {
  title: 'Listings | PV Coastal Realty',
  description: 'Browse PV Coastal Realty listings to view properties for sale from all around Banderas Bay, including Puerto Vallarta and Riviera Nayarit, to find you perfect dream home in paradise today!',
  other: {
    thumbnail: '/card.jpg'
  },
  alternates: {
    canonical: `${process.env.NEXT_SITE_BASEPATH}/about`,
  },
  twitter: {
    card: 'summary',
    title: 'Listings | PV Coastal Realty',
    description: 'Browse PV Coastal Realty listings to view properties for sale in Puerto Vallarta and Riviera Nayarit to find you perfect dream home in paradise today!',
    creator: '@pvcoastalrealty',
    images: [`/card.jpg`],
    url: `${process.env.NEXT_SITE_BASEPATH}/properties`
  },
  openGraph: {
    title: 'Listings | PV Coastal Realty',
    description: 'Browse PV Coastal Realty listings to view properties for sale in Puerto Vallarta and Riviera Nayarit to find you perfect dream home in paradise today!',
    type: 'website',
    images: [{url:`/card.jpg`}],
    url: `${process.env.NEXT_SITE_BASEPATH}/properties`
  },
}

const Page = () => {

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    },
    {
      url: `properties`,
      name: 'Properties'
    }
  ])

  return (
    <>
    <JsonLd data={breadcrumbData}/>
    <Banner title="Properties"/>
    <div className="flex flex-col space-y-8 px-4 py-8 md:p-8 xl:p-16">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 pb-2 border-b">
        <h2 className="text-3xl md:text-4xl font-bold">
          Browse All Properties
        </h2>
        <Link className="md:self-end hover:underline" href="/regions">
          Or Browse By Location
        </Link>
      </div>
      <Search />
    </div>
    <Contact />
  </>
  )
}

export default Page