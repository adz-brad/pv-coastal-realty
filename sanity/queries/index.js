import { groq } from "next-sanity";
import { client } from "../lib/client";

export const getFeatured = async () => {
    return await client.fetch(groq`*[_type == "listings"][0]{
        featured[]->
    }`)
    .then((res => res.featured))
}

export const getOffMarket = async () => {
    return await client.fetch(groq`*[_type == "listings"][0]{
        offMarket[]->
    }`)
    .then((res => res.offMarket))
}

export const getFeaturedZones = async () => {
    return await client.fetch(groq`*[_type == 'zone' && featured]`)
}

export const getRegions = async () => {
    return await client.fetch(groq`*[_type == 'region']{
        ...,
        zones[]->{title}
    }`)
}

export const getRegion = async (title) => {
    return await client.fetch(groq`*[_type == 'region' && title match $title][0]{
        ...,
        zones[]->{title,image,description,id}
    }`, { title: title })
}

export const getZone = async (title) => {
    return await client.fetch(groq`*[_type == 'zone' && title match $title][0]`, { title: title })
}

export const getRegionId = async (title) => {
    return await client.fetch(groq`*[_type == 'region' && $title in zones[]->title][0]{id}`, { title: title }).then((res) => res.id)
}

export const getMlsProperty = async (id) => {
    return await client.fetch(groq`*[_type == 'mlsProperty' && mlvId == $id][0]`, { id: id })
}

