import Image from "next/image"

const Banner = ({ image, title }) => {

  return (

    <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
          priority
          fetchPriority="high"
          loading="eager"
          src={image ? image : '/banner-image.webp'}
          alt={`PV Coastal Realty: ${title}`}
          fill={true}
          className="object-cover z-10"
          quality={100}
          placeholder={!image ? 'blur' : 'empty'}
          blurDataURL={!image ? '/banner-image.webp' : '/banner-image.webp'}
        />
        <div className="absolute top-0 left-0 z-20 bg-gradient-to-b from-zinc-900/70 via-zinc-900/40 to-transparent h-full w-full" />
        <div className="absolute top-1/2 left-1/2 -translate-y-4/5 -translate-x-1/2 z-30 w-screen max-w-screen-xl text-center px-4">
            <h1 className="text-3xl md:text-4xl xl:text-5xl text-zinc-50 drop-shadow-lg font-bold">
                {title}
            </h1>
        </div>
    </div>

  )
}

export default Banner