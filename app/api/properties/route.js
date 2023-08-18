import { NextResponse } from "next/server";
import addOAuthInterceptor from 'axios-oauth-1.0a'
import { agent, client, options, transformProperty } from '../../mls'

addOAuthInterceptor(client, options);

export async function POST (req) {

    const data = await req.json()

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://members.mlsvallarta.com/mls/mlsvallarta/api/property/search',
        headers: { 'Content-Type': 'application/json'},
        data : JSON.stringify(data),
        httpsAgent: agent
    }

    const properties = await client(config)
    .then((res) => res.data?.properties)
    .catch((err) => console.log(err))
    const transformed = await Promise.all(properties.map(async property => {
            return await transformProperty(property)
        }))

    return NextResponse.json(transformed)

}