'use client'
import { useState, useEffect } from 'react'
import { searchProperties } from "@/app/mls"
import { useSearchPayload } from '../hooks'
import PropertyCard from './PropertyCard'
import { ImSpinner9 } from 'react-icons/im'

const ShowProperties = ({ region, zones }) => {

    const [ page, setPage ] = useState(1)
    const [ properties, setProperties ] = useState([])
    const [ loading, setLoading ] = useState(false)

    let payload = useSearchPayload(page, region, zones)

    const getProperties = async () => {
        setLoading(true)
        const res = await searchProperties(payload)
        if(page === 1){
            setProperties(res)
            setPage(2)
        }
        else{
            setProperties([...properties, ...res])
            setPage(page+1)
        }
        setLoading(false)
    }

    useEffect(() => {
      getProperties()
  }, [])

  const isMore = properties.length % 12 == 0

  return (
    <div className="flex flex-col space-y-8 xl:space-y-16">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.length > 0 &&
            properties.map((property, i) => {
              return <PropertyCard property={property} key={i} i={i} />
            })
          }
        </ul>
        {isMore &&
          <button className="button mx-auto min-w-[300px]" onClick={() => getProperties()}>
            {loading ? <ImSpinner9 className="animate-spin mx-auto"/> : 'Show More'}
          </button>
        }
    </div>
  )
}

export default ShowProperties