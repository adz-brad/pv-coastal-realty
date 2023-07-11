import Banner from "@/app/components/Banner"
import Contact from "@/app/components/Contact"
import ShowProperties from "@/app/components/ShowProperties"
import Link from "next/link"

const Page = () => {
  return (
    <>
    <Banner title="Properties"/>
    <div className="flex flex-col space-y-8 px-4 py-8 md:p-8 xl:p-16">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 pb-2 border-b">
        <h2 className="text-3xl md:text-4xl font-bold">
          Browse All Properties
        </h2>
        <Link className="md:self-end hover:underline" href="/regions">
          Or Browse By Location
        </Link>
      </div>
      <ShowProperties />
    </div>
    <Contact />
  </>
  )
}

export default Page