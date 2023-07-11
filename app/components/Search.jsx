'use client'

import { useState } from "react"
import { IoSearch } from "react-icons/io5"
import { regions } from "@/data"
import { MdClose } from "react-icons/md"
import update from 'immutability-helper'
import { ImSpinner9 } from 'react-icons/im'
import RangeSlider from "./RangeSlider"

const Search = ({ loading }) => {


    const [ zones, setZones ] = useState([])
    const [ value, setValue ] = useState({ min: 50000, max: 1000000 })

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    const remove = (i) => {
        setZones(update(zones, {
            $splice: [[i,1]]
        }))
    }

    const ammenities = [
        {
            id: 1,
            title: 'Air Conditioning'
        },
        {
            id:6,
            title: 'Beachfront'
        }
    ]

    const view = [
        {
            id: 76,
            title: 'Pool'
        },
        {
            id: 78,
            title: 'Ocean'
        },
        {
            id: 77,
            title: 'Beach'
        },
        {
            id: 83,
            title: 'Marina'
        },
        {
            id: 86,
            title: 'Golf'
        },
    ]


  return (
    <div className="flex flex-col space-y-8">
        <div className="flex flex-row items-center w-full space-x-2">
            <IoSearch className="text-2xl" />
            <input  
                id="propertyName"
                name="propertyName"
                type="text" 
                className="form-input grow"
                placeholder="Search by MLV Number, Property Name, Neighborhood, etc." 
                title="Search by MLV Number, Property Name, Neighborhood, etc."
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type='hidden' id="zone-data" name="zone-data" value={JSON.stringify(zones)} />
                <select 
                    title="Select Zones"
                    name="zones"
                    id="zones"
                    className="form-select"
                    onChange={(e) => {
                        const obj = JSON.parse(e.target.value)
                        if(!zones.find(e => e.zone.title === obj.zone.title)){
                            setZones([...zones, obj])
                        }
                    }}
                >

                        <option disabled selected className="hidden">
                            Select Zones To Search
                        </option>

                    {regions?.map((region, i) => {
                        return (
                            <optgroup 
                                key={i} 
                                label={region.title}
                                title={region.title}
                            >
                            {region.zones?.map((zone, i) => {
                                return (
                                    <option title={zone.title} key={i} value={JSON.stringify({region: { title: region.title, id: region.id }, zone: { title: zone.title, id: zone.id }})}>
                                        {zone.title}
                                    </option>
                                )
                            })}
                        </optgroup>
                    )
                    })}
            </select>
            <select name="Bedrooms" id="Bedrooms" title="Select Number of Bedrooms" className="form-select">
                <option selected disabled className="hidden">
                    Number of Bedrooms
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
            </select>
            <select name="Bathrooms" id="Bathrooms" title="Select Number of Bathrooms" className="form-select">
                <option selected disabled className="hidden">
                    Number of Bathrooms
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
            </select>
        </div>
        {zones.length > 0 &&
            <div className="py-4">
                {zones.map(({zone}, i) => {
                    return (
                        <span key={i} className="flex flex-row items-center">
                            <MdClose className="text-red-600 mr-2" role="button" onClick={() => remove(i)} />
                            {zone.title}
                        </span>
                    )
                })}
            </div>
        }
        <div className="flex flex-col md:flex-row space-y-4 lg:space-y-0 lg:space-x-8 w-full">
            <div className="flex flex-col space-y-2">
            <span className="text-lg font-medium">
                Ammenities
            </span>
                <div className="grid grid-cols-2 gap-4">
                    {ammenities.map((item, i) => {
                        return (
                            <div key={i} className="flex flex-row items-center space-x-2">
                                <input
                                    key={i}
                                    id={item.title}
                                    title={item.title}
                                    name={item.title}
                                    type="checkbox"
                                    value={item.id}
                                    className="form-checkbox"
                                />
                                <label htmlFor={item.title}>
                                    {item.title}
                                </label>
                            </div>
                        )
                    })}
                </div>
                
            </div>
            <div className="flex flex-col space-y-2">
            <span className="text-lg font-medium">
                View
            </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {view.map((item, i) => {
                        return (
                            <div className="flex flex-row items-center space-x-2">
                                <input
                                    id={item.title}
                                    key={i}
                                    title={item.title}
                                    name={item.title}
                                    type="checkbox"
                                    value={item.id}
                                    className="form-checkbox"
                                />
                                <label htmlFor={item.title}>
                                    {item.title}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col grow space-y-4 lg:space-y-0">
                <div className="flex flex-row items-center">
                    <span className="text-lg font-medium mr-4">
                        Price Range
                    </span>
                    <span>{formatter.format(value.min)} - {formatter.format(value.max)}</span>
                </div>
                <RangeSlider min={0} max={10000000} step={50000} value={value} onChange={setValue} />
            </div>
        </div>
        <div className="flex flex-row items-center py-4">
            <button className="button min-w-[300px] mx-auto" type="submit">
                {loading ? <ImSpinner9 className="animate-spin mx-auto"/> : 'Search'}
          </button>
        </div>
    </div>
  )
}

export default Search