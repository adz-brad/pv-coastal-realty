import Banner from "@/app/components/Banner"
import Contact from "@/app/components/Contact"
import ShowProperties from "@/app/components/ShowProperties"
import Link from "next/link"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

export const revalidate = 3600

export const metadata = {
  title: 'Listings | PV Coastal Realty',
  description: 'Browse PV Coastal Realty listings to view properties for sale from all around Banderas Bay, including Puerto Vallarta and Riviera Nayarit, to find you perfect dream home in paradise today!',
  alternates: {
    canonical: `${process.env.NEXT_SITE_BASEPATH}/about`,
  },
  twitter: {
    card: 'summary',
    title: 'Listings | PV Coastal Realty',
    description: 'Browse PV Coastal Realty listings to view properties for sale in Puerto Vallarta and Riviera Nayarit to find you perfect dream home in paradise today!',
    creator: '@pvcoastalrealty',
    images: [`/pv-coastal-realty-logo.png`],
    url: `${process.env.NEXT_SITE_BASEPATH}/properties`
  },
  openGraph: {
    title: 'Listings | PV Coastal Realty',
    description: 'Browse PV Coastal Realty listings to view properties for sale in Puerto Vallarta and Riviera Nayarit to find you perfect dream home in paradise today!',
    type: 'website',
    images: [{url:`/pv-coastal-realty-logo.png`}],
    url: `${process.env.NEXT_SITE_BASEPATH}/properties`
  },
}

const Page = () => {

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: `${process.env.NEXT_SITE_BASEPATH}`,
      name: 'Home'
    },
    {
      url: `${process.env.NEXT_SITE_BASEPATH}/properties`,
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
      <ShowProperties />
    </div>
    <Contact />
  </>
  )
}

export default Page