import Banner from "@/app/components/Banner"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"
import MlsSearch from "@/app/components/MlsSearch"

import dynamic from "next/dynamic"

const Contact = dynamic(() => import('@/app/components/Contact'))

const Page = () => {

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    },
    {
      url: `search`,
      name: 'Search'
    }
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Banner title="Search Properties"/>
      <div className="relative flex flex-col mx-auto p-4 md:p-8 xl:px-0 xl:py-16 max-w-screen-xl space-y-8 xl:space-y-16">
        <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
          Find Your Dream Home
        </h2>
        <MlsSearch />
      </div>
      <Contact />
    </>
  )
}

export default Page