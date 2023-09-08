import Image from "next/image"
import Link from "next/link"

function BlogCard({ post, className }) {
  return (
<div className={`group relative overflow-hidden shadow-lg rounded-sm h-[350px] sm:h-[300px] ${className}`}>
                    <div className="absolute top-2 left-2 flex flex-col space-y-4 z-20 p-4">
                        <h3 className="text-neutral-100 group-hover:brightness-125 drop-shadow-lg text-xl font-semibold pb-2 border-b border-neutral-900">
                            {post.title}
                        </h3>
                        <p className="text-sm sm:text-base group-hover:brightness-125 text-neutral-100 drop-shadow-lg hidden group-hover:block">
                        {post.caption}
                    </p>
                    </div>
                    <Image
                        src={post.image}
                        alt={`PV Coastal Realty Blog: ${post.title}`}
                        fill
                        className="group-hover:brightness-50 object-cover z-10 group-hover:scale-110 transition-all duration-1000"
                    />
                    <Link 
                        href={`/blog/${post.slug}`}
                        className="absolute bottom-4 right-4 button z-20 w-fit"
                    >
                        Read More
                    </Link>
                </div>
  )
}
export default BlogCard