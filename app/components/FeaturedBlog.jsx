import Image from "next/image"
import Link from "next/link"

function FeaturedBlog({ posts }) {
  return (
    <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:h-[600px] space-y-8 md:space-x-8 md:space-y-0">
            <div className="group relative flex flex-col h-[350px] sm:h-[300px] md:h-auto md:w-1/2 xl:w-2/3 shadow-lg rounded-sm p-2 md:p-4 overflow-hidden">
                <div className="flex flex-col space-y-4 bg-neutral-500/20 rounded-sm shadow-lg z-20 p-4">
                    <h3 className="text-neutral-100 group-hover:brightness-125 drop-shadow-lg text-xl md:text-3xl font-semibold pb-2 border-b border-neutral-900">
                        {posts[0].title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-xl group-hover:brightness-125 text-neutral-100 drop-shadow-lg hidden group-hover:block">
                        {posts[0].caption}
                    </p>
                </div>
                <Image
                    src={posts[0].image}
                    alt={`PV Coastal Realty Blog: ${posts[0].title}`}
                    fill
                    className="group-hover:brightness-50 object-cover z-10 group-hover:scale-110 transition-all duration-1000"
                />
                <Link 
                    href={`/blog/${posts[0].slug}`}
                    className="absolute bottom-4 right-4 button z-20 w-fit"
                >
                    Read More
                </Link>
            </div>
            <div className="flex flex-col space-y-8 md:w-1/2 xl:w-1/3">
                <div className="group relative overflow-hidden shadow-lg rounded-sm h-[350px] sm:h-[300px] md:h-1/2">
                    <div className="absolute top-2 left-2 flex flex-col space-y-4 z-20 p-4">
                        <h3 className="text-neutral-100 group-hover:brightness-125 drop-shadow-lg text-xl font-semibold pb-2 border-b border-blue-900">
                            {posts[1].title}
                        </h3>
                        <p className="text-sm sm:text-base group-hover:brightness-125 text-neutral-100 drop-shadow-lg hidden group-hover:block">
                        {posts[1].caption}
                    </p>
                    </div>
                    <Image
                        src={posts[1].image}
                        alt={`PV Coastal Realty Blog: ${posts[1].title}`}
                        fill
                        className="group-hover:brightness-50 object-cover z-10 group-hover:scale-110 transition-all duration-1000"
                    />
                    <Link 
                        href={`/blog/${posts[1].slug}`}
                        className="absolute bottom-4 right-4 button z-20 w-fit"
                    >
                        Read More
                    </Link>
                </div>
                <div className="group relative overflow-hidden shadow-lg rounded-sm h-[350px] sm:h-[300px] md:h-1/2">
                    <div className="absolute top-2 left-2 flex flex-col space-y-4 z-20 p-4">
                        <h3 className="text-neutral-100 group-hover:brightness-125 drop-shadow-lg text-xl font-semibold pb-2 border-b border-neutral-900">
                            {posts[2].title}
                        </h3>
                        <p className="text-sm sm:text-base group-hover:brightness-125 text-neutral-100 drop-shadow-lg hidden group-hover:block">
                        {posts[2].caption}
                    </p>
                    </div>
                    <Image
                        src={posts[2].image}
                        alt={`PV Coastal Realty Blog: ${posts[2].title}`}
                        fill
                        className="group-hover:brightness-50 object-cover z-10 group-hover:scale-110 transition-all duration-1000"
                    />
                    <Link 
                        href={`/blog/${posts[2].slug}`}
                        className="absolute bottom-4 right-4 button z-20 w-fit"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
export default FeaturedBlog