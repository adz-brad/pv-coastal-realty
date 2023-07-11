'use client'
import Banner from "@/app/components/Banner"
import Contact from "@/app/components/Contact"
import Search from "@/app/components/Search"
import SearchResults from "@/app/components/SearchResults"
import { getPayload } from "@/data/search"
import { useState } from 'react'
import { searchProperties } from "@/app/mls"
import { ImSpinner9 } from 'react-icons/im'

const Page = () => {

  const [ page, setPage ] = useState(1)
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ results, setResults ] = useState([])

  const search = async (e) => {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    setData(formData)
    const payload = getPayload(1, formData)
    const res = await searchProperties(payload)
    setResults(res)
    setLoading(false)
  }

  const getMore = async () => {
    setLoading(true)
    const payload = getPayload(page, data)
    const res = await searchProperties(payload)
    setResults([...results, ...res])
    setPage(page+1)
    setLoading(false)
  }

  return (
    <>
      <Banner title="Search Properties"/>
      <div className="flex flex-col mx-auto p-4 md:p-8 xl:px-0 xl:py-16 max-w-screen-xl space-y-8 xl:space-y-16">
        <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
          Find Your Dream Home
        </h2>
        <form onSubmit={(e) => search(e)} className="flex flex-col space-y-3">  
          <Search loading={loading} /> 
        </form>
        <SearchResults results={results} />
        {results.length > 0 &&
          <button className="button" onClick={() => getMore()}>
            {loading ? <ImSpinner9 className="animate-spin mx-auto"/> : 'Show More'}
          </button>
        }
      </div>
      <Contact />
    </>
  )
}

export default Page