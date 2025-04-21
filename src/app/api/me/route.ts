import userApi from "@/services/users/user.service";
import { cookies } from "next/headers";
import { createClient } from "redis";

const client = createClient({
    url: 'redis://default:SocialNetworkPass@localhost:6379'
})

await client.connect().then(() =>{
    console.log("Connected to Redis")
})

export async function GET(){
    
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("SocialSessionID")
    const accessToken = await client.get(sessionId?.value ?? "")

    if (!accessToken) {
        return new Response(JSON.stringify({error: "Acceso denegado."}), {
            status: 403
        })
    }

    const response = await userApi.getMeInternal(accessToken)
    return new Response(JSON.stringify(response), {
        status: 200
    })
}