import { NextResponse } from "next/server";
import addOAuthInterceptor from 'axios-oauth-1.0a'
import { agent, client, options } from '../../mls'

addOAuthInterceptor(client, options);

export async function POST (req) {
    
    const limit = await req.json()

    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://members.mlsvallarta.com/mls/mlsvallarta/api/property/PVCOR/status',
        headers: { 'Content-Type': 'application/json'},
        data : JSON.stringify({"cmaView":false,"regView":false,"aboutToExpireView":false,"page":1,"status":"CURRENT","pageSize":limit}),
        httpsAgent: agent
    }
    
    const properties = await client(config)
        .then((res) => res.data?.properties)
        .catch((err) => console.log(err))

    const featuredProperties = await Promise.all(properties.map(async(e) => {
        return await fetch(`${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.pvcoastalrealty.com'}/api/property`, {
            method: 'POST',
            body: JSON.stringify(e.id)
          }).then((res) => res.json())
    }))
 
    return NextResponse.json(featuredProperties)

}