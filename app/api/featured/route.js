import { NextResponse } from "next/server";
//import addOAuthInterceptor from 'axios-oauth-1.0a'
//import { agent, client, options } from '../../mls'
import { getProperty } from "@/app/firebase/functions";

//addOAuthInterceptor(client, options);

export async function POST (req) {

    const featured = ['50080', '50059', '49782', '49607']
    
    //const limit = await req.json()

    //const config = {
    //    method: 'POST',
    //    maxBodyLength: Infinity,
    //    url: 'https://members.mlsvallarta.com/mls/mlsvallarta/api/property/PVCOR/status',
    //    headers: { 'Content-Type': 'application/json'},
    //    data : JSON.stringify({"cmaView":false,"regView":false,"aboutToExpireView":false,"page":1,"status":"CURRENT","pageSize":limit}),
    //    httpsAgent: agent
    //}
    
    //const properties = await client(config)
    //    .then((res) => res.data?.properties)
    //    .catch((err) => console.log(err))

    const featuredProperties = await Promise.all(featured.map(async(mlv) => {
        return await getProperty(mlv)
    }))
 
    return NextResponse.json(featuredProperties)

}