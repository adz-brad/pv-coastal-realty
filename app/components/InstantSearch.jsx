'use client'

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, SortBy } from 'react-instantsearch';
import SearchHits from './InstantSearchHits';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

export default function Search ({ restrict, filters }) {

    return (
        <InstantSearch 
        searchClient={searchClient} 
        indexName="mls-vallarta-firebase"
        >
            <div className="flex flex-row space-x-2 items-center">
                <span>Sort By</span>
                            <SortBy
                    classNames={{
                        select: "form-select"
                    }}
                    title="Sort Results"
                    items={[
                        { label: 'Newest', value: 'mls-vallarta-firebase' },
                        { label: 'Price (asc)', value: 'mls_sortBy_price_asce' },
                        { label: 'Price (desc)', value: 'mls_sortBy_price_desc' },
                    ]}
                />
                </div>
            <Configure restrictSearchableAttributes={restrict} filters={filters} hitsPerPage="12" />
            <SearchHits />
        </InstantSearch>
    )
}
