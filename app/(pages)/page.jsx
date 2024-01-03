import Hero from "../components/Hero"

import { useBreadcrumbJSON } from "../hooks"
import dynamic from "next/dynamic"
import Link from "next/link"
import { getFeatured } from "../firebase/functions"

const LandingContent = dynamic(() => import('@/app/components/LandingContent'))
const Contact = dynamic(() => import('@/app/components/Contact'))
const Featured = dynamic(() => import('@/app/components/Featured'))
const Regions = dynamic(() => import('@/app/components/Regions'))
const FeaturedBlog = dynamic(() => import('@/app/components/FeaturedBlog'))
const JsonLd = dynamic(() => import('@/app/components/JsonLd'))

export default async function Home() {


  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    }
  ])

  const featuredList = [
    "50523",
    "50080",
    "49782",
    "50726",
    "50750",
    "50748",
    "50565"
  ]

  const featuredProperties = await getFeatured(featuredList)
  
  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Hero />
      <LandingContent />
      <Featured properties={featuredProperties} />
      <Regions />
      <section className="flex flex-col space-y-8 p-4 md:p-8">
      <div className="flex flex-row space-x-4 pb-2 border-b">
          <h2 className="text-xl md:text-3xl xl:text-4xl font-bold">
              Featured Blog Posts
          </h2>
          <Link 
          href="/blog" 
          className="self-end hover:underline">
            View More
            </Link>
          </div>
        
      <FeaturedBlog />
      </section>
      <Contact />
    </>

  )
}
