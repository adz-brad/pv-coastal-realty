import Banner from "@/app/components/Banner"
import dynamic from "next/dynamic"
import { useBreadcrumbJSON } from "@/app/hooks"
import JsonLd from "@/app/components/JsonLd"
import { posts } from '@/app/blog'
import FeaturedBlog from "@/app/components/FeaturedBlog"
import BlogCard from "@/app/components/BlogCard"

const Contact = dynamic(() => import('@/app/components/Contact'))

export const metadata = {
    title: 'Blog | PV Coastal Realty',
    description: 'Browse our collection of blog posts to learn more about moving to paradise in Mexico!',
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/blog`,
    },
    other: {
      thumbnail: '/card.jpg'
    },
    twitter: {
      card: 'summary',
      title: 'Blog | PV Coastal Realty',
      description: 'Browse our collection of blog posts to learn more about moving to paradise in Mexico!!',
      creator: '@pvcoastalrealty',
      images: [`/card.jpg`],
      url: `${process.env.NEXT_SITE_BASEPATH}/blog`
    },
    openGraph: {
      title: 'Blog | PV Coastal Realty',
      description: 'Browse our collection of blog posts to learn more about moving to paradise in Mexico!',
      type: 'website',
      images: [{url:`/card.jpg`}],
      url: `${process.env.NEXT_SITE_BASEPATH}/blog`
    },
  }
  
  export const revalidate = 592200

  const Page = () => {

    const breadcrumbData = useBreadcrumbJSON([
      {
        url: null,
        name: 'Home'
      },
      {
        url: `blog`,
        name: 'Blog'
      }
    ])

    const featured = posts.filter(e => e.featured)
    const nonFeatured = posts.filter(e => !e.featured)

    return (
      <>
        <JsonLd data={breadcrumbData} />
        <Banner title="Blog"/>
        <div className="flex flex-col space-y-8 mx-auto px-4 py-8 md:p-8 xl:px-0 xl:py-16 max-w-screen-2xl">
        <div className="flex flex-row space-x-4 pb-2 border-b">
          <h2 className="text-xl md:text-3xl xl:text-4xl font-bold">
              Featured Posts
          </h2>
          <a 
          href="#more" 
          className="self-end hover:underline">
            View More
            </a>
          </div>
        
            <FeaturedBlog posts={featured} />
            <div id="more" className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 pb-2 border-b">
                <h2 className="text-xl md:text-3xl xl:text-4xl font-bold">
                    More Blog Posts
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {nonFeatured.map((post, i) => {
                    return <BlogCard key={i} post={post} />
                })}
            </div>
        </div>
        <Contact />
      </>
    )
  }

  export default Page