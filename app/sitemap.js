import { regions, navMenu } from "@/data"
import slugify from "slugify"
import { posts } from "./blog"

export default function sitemap() {

    const basePath = process.env.NEXT_SITE_BASEPATH
    const lastModified = new Date()

    const zones = regions.map(region => region.zones.map(zone => { return { region: region.title, zone:zone.title }}))
    const routes = zones.flat()
    
    return [
        {
            url: `${basePath}`,
            lastModified: lastModified
        },
        ...navMenu.map(item => { return { url: `${basePath}${item.path}`, lastModified: lastModified } }),
        ...regions.map(region => { return { url: `${basePath}/regions/${slugify(region.title, { lower: true })}`, lastModified: lastModified }}),
        ...regions.map(region => { return { url: `${basePath}/regions/${slugify(region.title, { lower: true })}/zones`, lastModified: lastModified }}),
        ...routes.map(route => { return { url: `${basePath}/regions/${slugify(route.region, { lower: true })}/zones/${slugify(route.zone, { lower: true })}`, lastModified: lastModified }}),
        ...posts.map(post => { return { url: `${basePath}/blog/${post.slug}`, lastModified: post.published }})
    ]
}