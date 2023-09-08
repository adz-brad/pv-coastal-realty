import Hero from "../components/Hero"

import { useBreadcrumbJSON } from "../hooks"
import dynamic from "next/dynamic"
import Link from "next/link"

import { posts } from "../blog"

const LandingContent = dynamic(() => import('@/app/components/LandingContent'))
const Contact = dynamic(() => import('@/app/components/Contact'))
const Featured = dynamic(() => import('@/app/components/Featured'))
const Regions = dynamic(() => import('@/app/components/Regions'))
const FeaturedBlog = dynamic(() => import('@/app/components/FeaturedBlog'))
const JsonLd = dynamic(() => import('@/app/components/JsonLd'))

export const revalidate = 86399

export default async function Home() {

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    }
  ])

  const featured = posts.filter(e => e.featured)

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Hero />
      <LandingContent />
      <Featured />
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
        
      <FeaturedBlog posts={featured} />
      </section>
      <Contact />
    </>

  )
}
