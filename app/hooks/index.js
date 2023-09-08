import { regions } from "@/data"
 
const basePath = process.env.NEXT_SITE_BASEPATH

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
            "itemListElement": ${data.map((item, i) => {
              return (
                `{
                  "@type": "ListItem",
                  "position": ${i+1},
                  "item": {
                      "@id": "${item.url ? `${basePath}/${item.url}` : `${basePath}`}",
                      "name": "${item.name}"
                  }
              }`
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
        "description": "${data.description?.replace(new RegExp('\r?\n','g'), '')}",
        "photo": {
            "@type": "ImageObject",
            "url": "${data.image}"          
        }
        },
        {
          "@type": "Product",
          "name": "${data.title}",
          "image": "${data.image}",
          "offers": {
            "@type": "Offer",
            "price": ${parseFloat(data.price?.replace(/[^a-zA-Z0-9-.]/g,'')).toFixed(2)},
            "priceCurrency": "USD"
        }
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
              "url": "${basePath}/about",
              "image": "${basePath}/marc-leblanc.jpg"
          },
          {
              "@type": "RealEstateAgent",
              "name": "Marc Leblanc",
              "url": "${basePath}/about",
              "image": "${basePath}/marc-leblanc.jpg",
              "photo": {
                  "@type": "ImageObject",
                  "url": "${basePath}/marc-leblanc.jpg",
                  "name": "Marc Leblanc"
              },
              "telephone": "+523223017394"
          }
      ]
  }`
  }

  export const useBlogJson = (data) => {
    return `{ "@context": "https://schema.org", 
    "@type": "BlogPosting",
    "headline": "${data.title}",
    "image": {
      "@type": "ImageObject",
      "@id": "https://www.pvcoastalrealty.com/_next/image?url=%2F${data.image}&w=640&q=100",
      "url": "https://www.pvcoastalrealty.com/_next/image?url=%2F${data.image}&w=640&q=100",
    },
    "genre": "${data.category}", 
    "keywords": [${data.keywords?.map(keyword => `"${keyword}"`)}],
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.pvcoastalrealty.com",
      "name": "PV Coastal Realty",
      "logo": {
          "@type": "ImageObject",
          "@id": "https://www.pvcoastalrealty.com/_next/image?url=%2Fpv-coastal-realty-logo.png&w=256&q=75",
          "url": "https://www.pvcoastalrealty.com/_next/image?url=%2Fpv-coastal-realty-logo.png&w=256&q=75",
          "width": "145",
          "height": "107"
      }
  },
    "url": "https://www.pvcoastalrealty.com/blog/${data.slug}",
    "isPartOf": {
      "@type" : "Blog",
       "@id": "https://www.pvcoastalrealty.com/blog",
       "name": "PV Coastal Real Estate Blog",
       "publisher": {
           "@type": "Organization",
           "@id": "https://www.pvcoastalrealty.com",
           "name": "PV Coastal Realty"
       }
   },
    "datePublished": "${data.published}",
    "dateCreated": "${data.published}",
    "description": "${data.caption}",
      "author": {
       "@type": "Organization", 
       "@id": "https://www.pvcoastalrealty.com",
       "name": "PV Coastal Realty"
     }
    }`
  }