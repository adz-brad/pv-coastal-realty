import { posts } from "@/app/blog"
import Banner from "@/app/components/Banner"
import PropertyCard from "@/app/components/PropertyCard"
import BlogCard from "@/app/components/BlogCard"
import Link from "next/link"

async function BlogLayout ({ params, children }) {

  const post = posts.filter(e => e.slug === params.post)[0]
  const featured = posts.filter(e => e.featured)

  const properties = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.pvcoastalrealty.com'}/api/featured`, {
    next: { revalidate: 86400 },
    method: 'POST',
    body: JSON.stringify(8)
  }).then((res) => res.json())

  return (
    <>
      <Banner title={post?.title} image={post?.image} />
      <div className="flex flex-col xl:flex-row space-y-16 xl:space-y-0 xl:space-x-24 p-4 md:p-8 xl:p-16">
        <div className="flex flex-col space-y-16 xl:w-3/4">
          <article>
            {children}
          </article>
          <div className="flex flex-col space-y-8">
          <div className="flex flex-row space-x-4 pb-2 border-b">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
              Featured Blog Posts
          </h2>
          <Link 
          href="/blog" 
          className="self-end hover:underline">
            View More
            </Link>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {featured?.map((post, i) => {
                return <BlogCard key={i} post={post} className="min-h-[500px]" />
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8 xl:w-1/4">
          <div className="flex flex-row space-x-4 pb-2 border-b">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Featured Properties
          </h2>
          <Link 
          href="/properties" 
          className="self-end hover:underline">
            View More
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
          {properties.map((property, i) => {
            return <PropertyCard key={i} property={property} className="max-h-[400px]" />
          })}
          </div>
        </div>
      </div>
    </>
  )
}
export default BlogLayout