import UserPageContainerAsync from "@/components/users/UserPageContainerAsync";
import userApi from "@/services/users/user.service";
import { cookies } from "next/headers";
import { createClient } from "redis";

const client = createClient({
    url: 'redis://default:SocialNetworkPass@localhost:6379'
})

await client.connect().then(() =>{
    console.log("Connected to Redis")
})



const ProfilePage = async () => {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("SocialSessionID")
    const accessToken = await client.get(sessionId?.value ?? "")

    if (!accessToken) {
        return new Response(JSON.stringify({error: "Acceso denegado."}), {
            status: 403
        })
    }

    const me = await userApi.getMeInternal(accessToken)
    return <UserPageContainerAsync username={me.username} />
}

export default ProfilePage;
