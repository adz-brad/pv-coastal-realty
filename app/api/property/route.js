import { NextResponse } from "next/server";
//import addOAuthInterceptor from 'axios-oauth-1.0a'
//import { agent, client, options, transformProperty } from '../../mls'
import { getProperty } from "@/app/firebase/functions";
//addOAuthInterceptor(client, options);

export async function POST (req) {

    const id = await req.json()
    //const config = {
    //    method: 'POST',
    //    maxBodyLength: Infinity,
    //    url: `https://members.mlsvallarta.com/mls/mlsvallarta/api/property/${id}`,
    //    headers: {'Content-Type': 'application/json'},
    //    data : JSON.stringify({propertyId: `${id}`}),
    //    httpsAgent: agent,
    //}
    //const property = await client(config)
    //.then((res) => res.data.propertyModel)
    //.catch((err) => console.log(err))

    //const newProperty = await transformProperty(property)

    const property = await getProperty(id)
    
    return NextResponse.json(property)

}