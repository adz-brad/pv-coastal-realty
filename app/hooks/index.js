import { regions } from "@/data";

export const getTitleFromSlug = (string) => {
    const arr = string.split('-')
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ')
  }

  export const useSearchPayload = (page, region, zones) => {
    return {
      page: page,
      mlsId:"mlsvallarta",
      search: {
          featureValues:[],
          daysOnMarket:true,
          pageSize: 12,
          propertyTypes:[{id: 2}, {id: 3}],
          regions: region ? [{id: region}] : [],
          zones: zones ? zones.map(zone => { return { id: zone } }) : [],
          status:["CURRENT"],
          fromStorage:true
      }
    }
  }

  export const useRegionData = (region) => {
    return regions.filter(e => e.title.toLowerCase() === region.toLowerCase())[0]
  }

  export const useRegionParams = (region) => {
    return {
      regionId: region.id,
      zoneIds: region.zones.map(zone => { return zone.id })
    }
  }

  export const useZoneData = (region, zone) => {
    const data = useRegionData(region)
    return {regionId: data.id, zone: data.zones.filter(e => e.title.toLowerCase() === zone.toLowerCase())[0]}
  }

  export const useBreadcrumbJSON = (data) => {
    return `{
      "@context": "https://schema.org",
      "@graph": [
          {
              "@type": "BreadcrumbList",
              "itemListElement": ${data.listItems.map((item,i) => {
                return (
                  `{
                    "@type": "ListItem",
                    "position": ${i+1},
                    "item": {
                        "@id": "${item.url}",
                        "name": "${item.name}"
                    }
                },`
                )
              })}
          }
      ]
    }`
  }

  export const usePropertyJSON = (data) => {
   
    return `{
      "@context": "https://schema.org",
      "@graph": [
          {
              "@type": "SingleFamilyResidence",
              "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "${data.address.street}",
                  "addressLocality": "${data.address.city}",
                  "addressRegion": "${data.address.state}",
                  "postalCode": "${data.address.postalCode}"
              },
              "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": ${data.address.coordinates.lat},
                  "longitude": ${data.address.coordinates.lon}
              }
          },
          {
              "@type": "${data.type}",
              "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "${data.address.street}",
                  "addressLocality": "${data.address.city}",
                  "addressRegion": "${data.address.state}",
                  "postalCode": "${data.address.postalCode}"
              },
              "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": ${data.address.coordinates.lat},
                  "longitude": ${data.address.coordinates.lon}
              },
              "description": "${data.description.replace(new RegExp('\r?\n','g'), '')}",
              "photo": {
                  "@type": "ImageObject",
                  "url": ${data.images?.map((image) => {
                    return `"${image.url}"`
                  })}          
              }
          },
          {
              "@type": "Offer",
              "price": "${data.price}",
              "priceCurrency": "USD",
          }
      ]
  }`
  }

  export const useAgentJSON = () => {
    return `{
      "@context": "https://schema.org",
      "@graph": [
          {
              "@type": "Person",
              "name": "Marc Leblanc",
              "url": "https://www.pvcoastalrealty.com/about",
              "image": "imageurl"
          },
          {
              "@type": "RealEstateAgent",
              "name": "Marc Leblanc",
              "url": "https://www.pvcoastalrealty.com/about",
              "image": "imageurl",
              "photo": {
                  "@type": "ImageObject",
                  "url": "imageurl",
                  "name": "Marc Leblanc"
              },
              "telephone": "contact number"
          }
      ]
  }`
  }