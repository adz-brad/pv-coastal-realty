import Banner from "@/app/components/Banner"
import Contact from "@/app/components/Contact"
import { agents, agency } from "@/data"
import Image from "next/image"

const Page = () => {
  return (
    <>
    <Banner title="About Us"/>
    <div className="flex flex-col space-y-8 p-4 md:p-8 lg:py-16">
      <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
          About Us
      </h2>
      <p>
        {agency.description}
      </p>
      <h3 className="pb-2 border-b font-semibold text-2xl">
        Our Agents
      </h3>
      <ul className="flex flex-col space-y-16 lg:space-y-8">
        {agents.map((agent, i) => {
          return (
            <li 
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8"
              key={i}
            >
              <div className="relative rounded-full min-w-[300px] h-[300px] lg:min-w-[250px] lg:h-[250px] shadow-lg">
                <Image
                  className="object-cover rounded-full shadow-lg"
                  src={agent.imageUrl ? agent.imageUrl : './avatar.webp'}
                  alt={`PV Coastal Realty: Meet Agent ${agent.name}`}
                  fill={true}
                />
              </div>
              <div className="flex flex-col grow space-y-4">
                <h3 className="text-2xl font-semibold">
                  {agent.name}
                </h3>
                <p>
                  {agent.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
    <Contact />
  </>
  )
}

export default Page