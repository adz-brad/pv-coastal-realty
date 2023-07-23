'use client'
import Banner from "@/app/components/Banner"
import Search from "@/app/components/Search"
import SearchResults from "@/app/components/SearchResults"
import { getPayload } from "@/data/search"
import { useState, useEffect, useRef } from 'react'
import { searchProperties } from "@/app/mls"
import { ImSpinner9 } from 'react-icons/im'
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

import dynamic from "next/dynamic"

const Contact = dynamic(() => import('@/app/components/Contact'))

const Page = () => {

  const [ page, setPage ] = useState(1)
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ results, setResults ] = useState([])
  const [ loadmore, setLoadmore ] = useState(false)

  const scrollRef = useRef()

  const search = async (e) => {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    setData(formData)
    const payload = getPayload(1, formData)
    const res = await searchProperties(payload)
    setResults(res)
    const scrollDiv = document.getElementById("search-results").offsetTop
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'})
    setPage(page+1)
    setLoading(false)
  }

  const getMore = async () => {
    setLoading(true)
    const payload = getPayload(page, data)
    const res = await searchProperties(payload)
    setResults([...results, ...res])
    setPage(page+1)
    setLoading(false)
    setLoadmore(false)
  }

  useEffect(() => {
    if(loadmore){
      getMore()
    }
  }, [ loadmore ])

  useEffect(() => {
    if(results.length === 12){
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if(entry.isIntersecting && !loading){
          setLoadmore(true)
        }
      })
      observer.observe(scrollRef.current)
    }
  }, [ results ])

  const isMore = results.length % 12 == 0

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    },
    {
      url: `search`,
      name: 'Search'
    }
  ])

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <Banner title="Search Properties"/>
      <div className="relative flex flex-col mx-auto p-4 md:p-8 xl:px-0 xl:py-16 max-w-screen-xl space-y-8 xl:space-y-16">
        <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
          Find Your Dream Home
        </h2>
        <form onSubmit={(e) => search(e)} className="flex flex-col space-y-3">  
          <Search loading={loading} /> 
        </form>
        <SearchResults results={results} />
        {isMore &&
          <div ref={scrollRef} className="absolute top-full -translate-y-[1264px] h-20 w-20"/>
        }
        {loading && results.length > 12 && <ImSpinner9 className="animate-spin mx-auto text-4xl text-sky-600"/> }
      </div>
      <Contact />
    </>
  )
}

export default Page