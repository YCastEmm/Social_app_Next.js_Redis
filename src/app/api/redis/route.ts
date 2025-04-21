import { NextResponse } from "next/server";
import { createClient } from "redis";

const client = createClient({
    url: 'redis://default:SocialNetworkPass@localhost:6379'
})

await client.connect().then(() =>{
    console.log("Connected to Redis")
})

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const key = searchParams.get("key") ?? ""

    return NextResponse.json({key: await client.get(key)})
}