import Hero from "../components/Hero"
import Featured from "../components/Featured"
import Regions from "../components/Regions"
import Contact from "@/app/components/Contact"

export default async function Home() {

  return (
    <>
      <Hero />
      <Featured />
      <Regions />
      <Contact />
    </>

  )
}
