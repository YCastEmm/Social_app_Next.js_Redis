
import authService from "@/services/auth/auth.service";
import { type NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest){
    
    try {
        const authCookie = request.cookies.get("SocialSessionID")
        const cookie = await cookies()


        if (authCookie){
            const sessionId = authCookie.value
            await authService.logout(sessionId)
        }

        cookie.delete("SocialSessionID")
        cookie.delete("SocialUsername")

        return new Response(JSON.stringify({}), {
            status: 200
        })

    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Internal server error'
        }), {
            status: 500,
        })
    }
}


