import httpInternalApi from "@/services/common/http.internal.service";
import { headers } from "next/headers";


export async function GET(request: Request) {
    console.clear()
    const url = request.url.split("/proxy")[1];
    const accessToken = (await headers()).get("x-social-access-token") ?? ""

    const response = await httpInternalApi.httpGet(url, undefined, accessToken ?? undefined)
    
    return new Response(JSON.stringify(response), {
        status: 200,
    });
}

export async function POST(request: Request) {
    console.clear()
    const url = request.url.split("/proxy")[1];

    const accessToken = (await headers()).get("x-social-access-token") ?? ""
    const body = await request.json()
    const response = await httpInternalApi.httpPost(url, body, accessToken ?? undefined)
    
    return new Response(JSON.stringify(response), {
        status: 200,
    });
}



