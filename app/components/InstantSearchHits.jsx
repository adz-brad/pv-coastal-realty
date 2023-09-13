import SearchCard from './SearchCard';
import { useInfiniteHits } from 'react-instantsearch';
import { useState, useEffect, useRef } from 'react'
import { ImSpinner9 } from 'react-icons/im'

function SearchHits() {

    const { hits, showMore } = useInfiniteHits()
    const [ loading, setLoading ] = useState(false)
    const scrollRef = useRef()

    const isMore = hits.length % 12 == 0

    useEffect(() => {
        if(isMore && showMore){
          const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if(entry.isIntersecting && !loading){
              setLoading(true)  
              showMore()
              setLoading(false)
            }
          })
          observer.observe(scrollRef.current)
        }
      }, [showMore])
  
  return (
    <div className="relative flex flex-col space-y-8 xl:space-y-16 py-8">
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {hits.map((hit) => {
            return <SearchCard key={hit.mlvId} hit={hit} />
        })}
    </ul>

    <div ref={scrollRef} className="h-20 w-20">{loading && <ImSpinner9 className="animate-spin mx-auto text-4xl text-sky-600"/>}</div>
    </div>
  )
}
export default SearchHits