'use client'

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, SearchBox, SortBy, RefinementList, ClearRefinements } from 'react-instantsearch';
import SearchHits from './InstantSearchHits';
import { IoSearch } from "react-icons/io5"
import RangeSlider from './RangeSlider';
import SearchByZone from './SearchByZone';
import InstantSearchSelect from './InstantSearchSelect';
import SearchResultsWrapper from './SearchResultsWrapper';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);

export default function MlsSearch() {

  return (
    <div className="flex flex-col space-y-8">
        <InstantSearch 
            searchClient={searchClient} 
            indexName="mls-vallarta-firebase"
        >
            <Configure hitsPerPage="12" />
            <div className="flex flex-row items-center w-full space-x-2">
                <IoSearch className="text-2xl" />
                <SearchBox 
                    placeholder="Search by MLV Number, Property Name, Neighborhood, etc."
                    title='Search by MLV Number, Property Name, Neighborhood, etc.'
                    classNames={{
                        root: 'grow',
                        form: 'flex',
                        input: 'form-input grow',
                        submitIcon: 'hidden',
                        resetIcon: 'hidden'
                    }}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchByZone />
                <InstantSearchSelect
                      name="Bedrooms"
                      placeholder="Number of Bedrooms"
                      title="Select Number of Bedrooms"
                      options={[1,2,3,4,5,6,7,8,9,10,11,12]}
                      refinementProps={{attribute: "bedrooms", min: 0, max: 20}}
                />
                <InstantSearchSelect
                      name="Bathrooms"
                      placeholder="Number of Bathrooms"
                      title="Select Number of Bathrooms"
                      options={[1,2,3,4,5,6,7,8,9,10,11,12]}
                      refinementProps={{attribute: "bathrooms", min: 0, max: 20}}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-2">
                    <span className="text-lg font-medium">
                        Ammenities
                    </span>
                        <RefinementList 
                            attribute="ammenities.en"
                            operator='and'
                            classNames={{
                                list: "grid grid-cols-2 gap-2",
                                label: "flex flex-row items-center space-x-2",
                                checkbox: "form-checkbox",
                                count: "hidden"
                            }}
                        />
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="text-lg font-medium">
                        View
                    </span>

                    <RefinementList 
                            attribute="view.en"
                            operator='and'
                            classNames={{
                                list: "grid grid-cols-2 gap-2",
                                label: "flex flex-row items-center space-x-2",
                                checkbox: "form-checkbox",
                                count: "hidden"
                            }}
                        />

                </div>
                <RangeSlider />
            </div>
            <SearchResultsWrapper>
            <div className="flex flex-row space-x-2 items-center mt-4">
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
                <ClearRefinements 
                    classNames={{
                        button: "py-2 px-4 shadow-md rounded-sm cursor-pointer hover:bg-sky-600 hover:text-neutral-100 font-medium"
                    }}
                    translations={{
                        resetButtonText: 'Clear Filters',
                    }}
                />
                </div>
                <SearchHits />
            </SearchResultsWrapper>

        </InstantSearch>
    </div>
  )
}