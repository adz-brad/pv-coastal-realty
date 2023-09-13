import { useInfiniteHits } from 'react-instantsearch';

function SearchResultsWrapper({ children }) {

  const { results } = useInfiniteHits()

  return (
    
    <div id="search-results" className="py-4">
    <div className="flex flex-row items-center space-x-4 pb-2 border-b">
      <h2 className="text-3xl lg:text-4xl font-bold">
        Search Results
      </h2>
      <span className="text-lg">{results.nbHits} Results</span>
      </div>
            {children}
    </div>
    
  )
}
export default SearchResultsWrapper