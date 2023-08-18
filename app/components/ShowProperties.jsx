'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchPayload } from '../hooks'
import PropertyCard from './PropertyCard'
import { ImSpinner9 } from 'react-icons/im'

const ShowProperties = ({ region, zones }) => {

    const [ page, setPage ] = useState(1)
    const [ properties, setProperties ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ loadmore, setLoadmore ] = useState(false)
    const scrollRef = useRef()

    let payload = useSearchPayload(page, region, zones)

    const getProperties = async () => {
        setLoading(true)
        const res = await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.pvcoastalrealty.com'}/api/properties`, {
          next: { revalidate: 86400 },
          method: 'POST',
          body: JSON.stringify(payload)
        }).then((res) => res.json())
        if(page === 1){
            setProperties(res)
            setPage(2)
        }
        else{
            setProperties([...properties, ...res])
            setPage(page+1)
        }
        setLoading(false)
        setLoadmore(false)
    }

    useEffect(() => {
      getProperties()
  }, [])

  useEffect(() => {
    if(loadmore){
      getProperties()
    }
  }, [ loadmore ])

  useEffect(() => {
    if(properties.length === 12){
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if(entry.isIntersecting && !loading){
          setLoadmore(true)
        }
      })
      observer.observe(scrollRef.current)
    }
  }, [ properties ])

  const isMore = properties.length % 12 == 0

  return (
    <div className="relative flex flex-col space-y-8 xl:space-y-16">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties &&
            properties.length > 0 &&
              properties.map((property, i) => {
                return <PropertyCard property={property} key={i} i={i} />
              })
          }
        </ul>
        {isMore &&
          <div ref={scrollRef} className="absolute top-full -translate-y-[1264px] h-20 w-20"/>
        }
        {loading && <ImSpinner9 className="animate-spin mx-auto text-4xl text-sky-600"/> }
    </div>
  )
}

export default ShowProperties