import FeaturedCarousel from "./FeaturedCarousel"

const Featured = async () => {

  const properties = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.pvcoastalrealty.com'}/api/featured`, {
    next: { revalidate: 86400 },
    method: 'POST',
    body: JSON.stringify(8)
  }).then((res) => res.json())

  return (
    <div id="featured-properties" className="flex flex-col px-4 lg:px-8 py-16">
      <h2 className="pb-2 border-b text-3xl md:text-4xl font-bold">
        Featured Properties
      </h2>
      <FeaturedCarousel properties={properties} />
    </div>
  )
}

export default Featured