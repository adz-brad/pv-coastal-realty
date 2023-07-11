export const getPayload = (page, data) => {

    let payload = {
        page: page,
        mlsId:"mlsvallarta",
        search: {
            featureValues:[],
            daysOnMarket:true,
            pageSize: 12,
            propertyTypes:[{id: 2}, {id: 3}],
            priceRange: { low: data.get('minPrice'), high: data.get('maxPrice') },
            regions:[],
            zones:[],
            status:["CURRENT"],
            fromStorage:true
        }
    }

    let viewOptions = []
 
    for(var val of data.entries()){
        if(val[0] === 'Air Conditioning' || val[0] === 'Beachfront'){
            payload.search.featureValues.push({"featureMeta": { "id": val[1], "type":"BOOLEAN" }})
        }
        if(val[0] === 'Pool' || val[0] === 'Ocean' || val[0] === 'Beach' || val[0] === 'Marina' || val[0] === 'Golf'){
            viewOptions.push({ "id": val[1] })
        }
        if(val[0] === 'Bathrooms'){
            payload.search.featureValues.push(            {
                "featureMeta": { "id": 5 },
                "range": { "low": val[1] , "high": val[1] === 4 ? 20 : val[1] }
            })
        }
        if(val[0] === 'Bedrooms'){
            payload.search.featureValues.push(            {
                "featureMeta": { "id": 4 },
                "range": { "low": val[1] , "high": val[1] === 4 ? 20 : val[1] }
            })
        }
        if(val[0] === 'zone-data'){
            const locations = JSON.parse(val[1])
            locations.map(location => {
                payload.search.regions.push(location.region)
                payload.search.zones.push(location.zone)
            })
        }
        if(val[0] === 'propertyName' && val[1].length > 0){
            payload.search.propertyName = val[1]
        }
    }

    if(viewOptions.length > 0){
        payload.search.featureValues.push({"featureMeta": {"id": 36, "type": "TEXT"}, "options": viewOptions})
    }

    return payload
}