'use server'
import addOAuthInterceptor from 'axios-oauth-1.0a'
import axios from "axios"
import https from "https"

const agent = new https.Agent({  
    rejectUnauthorized: false
  });

const client = axios.create();

const options = {
    algorithm: "HMAC-SHA1",
    key: process.env.NEXT_MLS_CONSUMER_KEY,
    secret: process.env.NEXT_MLS_CONSUMER_SECRET,
    token: process.env.NEXT_MLS_ACCESS_TOKEN,
    tokenSecret: process.env.NEXT_MLS_TOKEN_SECRET
};

addOAuthInterceptor(client, options);

const transformProperty = (e) => {

    // Set Features

    let features = []
    const selectedFeatures = e.features.filter(feature => feature.featureValue.propertyFeatureMeta.localizedName.strings.en_us === 'Bedrooms' | feature.featureValue.propertyFeatureMeta.localizedName.strings.en_us === 'Bathrooms' | feature.featureValue.propertyFeatureMeta.localizedName.strings.en_us === 'Construction Size (M2)')
    selectedFeatures.map((feature) => {
        let value;
        if(feature.featureValue.propertyFeatureMeta.type === 'NUMBER'){
            value = feature.featureValue.intValue
        }
        else if(feature.featureValue.propertyFeatureMeta.type === 'DECIMAL'){
            value = feature.featureValue.decimalValue
        }
        else if(feature.featureValue.propertyFeatureMeta.type === 'TEXT'){
            value = feature.featureValue.decimalValue
        }
        const obj = {
            title: {
                "en": feature?.featureValue?.propertyFeatureMeta?.localizedName?.strings?.en_us,
                "es": feature?.featureValue?.propertyFeatureMeta?.localizedName?.strings?.es_mx
            },
            value: value
        }
    features.push(obj)
    })

    // Set Image URLS

    let images = []
    const alt = `${e.propertyName} ${e.propertyTypeValue.propertyTypeValue.localizedName.strings.en_us} for sale in ${e.propertyAddress.zone.name}.`
    e.propertySlide.images.map((image, i) => {
        const url = `https://members.mlsvallarta.com/mls/property/image/mlsvallarta/${e.id}/hero_${image.name}.jpg`
        const placeholder = `https://members.mlsvallarta.com/mls/property/image/mlsvallarta/${e.id}/thumbList_${image.name}.jpg`
        const obj = {
            url: url,
            alt: alt,
            index: i,
            placeholder: placeholder
        }
        images.push(obj)
        
    })
    //images.sort((i1, i2) => (i1.order > i2.order) ? 1 : (i1.order < i2.order) ? -1 : 0)

    // Set Property Fields

    const newProperty = {
        "id": e.id,
        "mlvId": e.mlvNumber,
        "title": e.propertyName,
        "createdOn": e.createdOn,
        "updatedOn": e.updatedOn,
        "daysOnMarket": e.daysOnMarket,
        "price": {
            "start": e.contract?.contractPrice?.initialPriceFormatted,
            "current": e.contract?.contractPrice?.currentPriceFormatted
        },
        "address": {
            "street": e.propertyAddress?.addressMetaValues[0]?.value,
            "city": e.propertyAddress?.zone?.city,
            "state": e.propertyAddress?.zone?.state,
            "region": e.propertyAddress?.zone?.name,
            "description": {
                "en": e.propertyAddress?.zone?.localizedDescription?.strings?.en_us,
                "es": e.propertyAddress?.zone?.localizedDescription?.strings?.es_mx,
            },
            "coordinates": {
                "lat": e.propertyAddress?.location?.lat,
                "lon": e.propertyAddress?.location?.lon
            }
        },
        "type": {
            "en": e.propertyTypeValue?.propertyTypeValue?.localizedName?.strings?.en_us,
            "es": e.propertyTypeValue?.propertyTypeValue?.localizedName?.strings?.es_mx
        },
        "description": {
            "en": e.localizedDescription?.strings?.en_us,
            "es": e.localizedDescription?.strings?.es_mx
        },
        "features": features,
        "images": images
    }
    return newProperty
}

export const getProperty = async (id) => {

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: `https://members.mlsvallarta.com/mls/mlsvallarta/api/property/${id}`,
        headers: {'Content-Type': 'application/json' },
        data : JSON.stringify({propertyId: `${id}`}),
        httpsAgent: agent
    }

    const property = await client(config)
    .then((res) => res.data.propertyModel)
    .catch((err) => console.log(err))
 
    if(property){
        return transformProperty(property)
    }
    else { 
        return null
    }
}


export const getFeatured = async (limit) => {

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://members.mlsvallarta.com/mls/mlsvallarta/api/property/PVCOR/status',
        headers: { 'Content-Type': 'application/json' },
        data : JSON.stringify({"cmaView":false,"regView":false,"aboutToExpireView":false,"page":1,"status":"CURRENT","pageSize":limit}),
        httpsAgent: agent
    }
    
    
    const properties = await client(config)
        .then((res) => res.data?.properties)
        .catch((err) => console.log(err))

    if(properties){
        return await Promise.all(properties.map(async(e) => {
            return await getProperty(e.id).then((res) => res)
        }))
    }
    else{
        return []
    }
 
}

export const searchProperties = async (data) => {

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://members.mlsvallarta.com/mls/mlsvallarta/api/property/search',
        headers: { 'Content-Type': 'application/json' },
        data : JSON.stringify(data),
        httpsAgent: agent
    }
    const properties = await client(config)
    .then((res) => res.data?.properties)
    .catch((err) => console.log(err))
    let transformed = []
    if(properties){
        properties.map(property => {
            const obj = transformProperty(property)
            transformed.push(obj)
        })
    }
    return transformed
}