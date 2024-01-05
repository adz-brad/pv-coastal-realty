import { posts } from "@/app/blog"
import Image from "next/image"
import { months } from "@/data"
import Share from "@/app/components/SocialSharing"
import { useBlogJson, useBreadcrumbJSON } from "@/app/hooks"
import JsonLd from "@/app/components/JsonLd"

export const revalidate = 592200

export async function generateMetadata({ params }) {

    const post = posts.filter(e => e.slug === params.post)[0]
  
    return {
      title: `${post?.title} | PV Coastal Realty`,
      description: `${post?.caption}`,
      alternates: {
        canonical: `${process.env.NEXT_SITE_BASEPATH}/blog/${params?.post}`,
      },
      other: {
        thumbnail: post?.image
      },
      twitter: {
        card: 'summary',
        title: `${post?.title} | PV Coastal Realty`,
        description: `${post?.caption}`,
        creator: '@pvcoastalrealty',
        images: [{ url: post?.image }],
        url: `${process.env.NEXT_SITE_BASEPATH}/blog/${params?.post}`
      },
      openGraph: {
        title: `${post?.title} | PV Coastal Realty`,
        description: `${post?.caption}`,
        type: 'website',
        images: [{ url: post?.image }],
        url: `${process.env.NEXT_SITE_BASEPATH}/blog/${params?.post}`
      },
    }
  }

function Page ({ params }) {

    const post = posts.filter(e => e.slug === params.post)[0]
    const published = `${months[post.published.getMonth()]} ${post.published.getDate()}, ${post.published.getFullYear()}`

    const blogData = useBlogJson({
        title: post?.title,
        image: post?.image,
        category: post?.category,
        keywords: post?.keywords,
        slug: post?.slug ,
        published: post?.published,
        caption: post?.caption
      })

      const breadcrumbData = useBreadcrumbJSON([
        {
          url: null,
          name: 'Home'
        },
        {
          url: `blog`,
          name: 'Blog'
        },
        {
          url: `blog/${post?.title}`,
          name: post?.title
        }
      ])

  return (
    <>
        <JsonLd data={breadcrumbData} />
        <JsonLd data={blogData} />
        <div className="flex flex-col space-y-8">
            <h2 className="text-xl md:text-3xl xl:text-4xl text-center font-bold pb-2 border-b">
                {post.title}
            </h2>
            <div className="flex flex-col-reverse lg:flex-row lg:space-x-8 border-b pb-8">
                <div className="relative lg:w-1/2 h-[300px] shadow-lg rounded-md">
                    <Image 
                        src={post.image}
                        fill
                        className="object-cover shadow-lg rounded-md"
                        alt={`PV Coastal Realty Blog: ${post.title}`}
                    />
                </div>
                <div className="flex flex-col lg:w-1/2">
                    <span>
                        Published: {published}
                    </span>
                    <p className="lg:text-lg italic my-4">
                        {post.caption}
                    </p>
                    <div className="mt-auto mb-4 lg:mb-0">
                    <Share url={`https://www.pvcoastalrealty.com/blog/${post.slug}`} />
                    </div>
                </div>
            </div>
            <div className="blog-body">
                {post.content}
            </div>
        </div>
    </>
  )
}
export default Page