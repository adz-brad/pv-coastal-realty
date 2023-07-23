import Hero from "../components/Hero"

import { useBreadcrumbJSON } from "../hooks"
import dynamic from "next/dynamic"

const LandingContent = dynamic(() => import('@/app/components/LandingContent'))
const Contact = dynamic(() => import('@/app/components/Contact'))
const Featured = dynamic(() => import('@/app/components/Featured'))
const Regions = dynamic(() => import('@/app/components/Regions'))
const JsonLd = dynamic(() => import('@/app/components/JsonLd'))

export const revalidate = 86400

export default async function Home() {

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    }
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Hero />
      <LandingContent />
      <Featured />
      <Regions />
      <Contact />
    </>

  )
}
