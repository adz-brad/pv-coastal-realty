'use client'

import Map, { Marker } from 'react-map-gl'
import { MdLocationPin } from 'react-icons/md'

const Mapbox = ({ coordinates, zoom, title }) => {

    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
                longitude: coordinates.lng,
                latitude: coordinates.lat,
                zoom: zoom,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker
                longitude={coordinates.lng}
                latitude={coordinates.lat}
                anchor="bottom-left"
            >
                <div className="flex flex-row items-center">
                <MdLocationPin className="text-red-500 text-4xl drop-shadow-md"/>
                    <span
                        className="px-2 py-1 rounded-md bg-zinc-50 font-medium ml-2"
                    >
                        {title}
                    </span>
                </div>
            </Marker>
        </Map>
    )

}

  export default Mapbox