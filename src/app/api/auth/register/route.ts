
import { AccessDeniedError, ConflictError } from "@/services/common/errors";
import authService from "@/services/auth/auth.service";
import { RegisterSchema } from "@/schemas/register.schema";

export async function POST(request: Request){
    const {username, password, name, photoUrl} = await RegisterSchema.validate(await request.json()) // Como next no me deja tipar el username y password, uso el validador de YUP
    
    try {
        const registerResponse = await authService.register(username, password, name, photoUrl)
        const authCookie = `SocialSessionID=${registerResponse.sessionId}; Expires=${registerResponse.expireAt}; Domain=localhost; Secure; HttpOnly; Path=/`

        return new Response(JSON.stringify(registerResponse.user), {
            status: 200,
            headers: {"Set-Cookie": authCookie}
        })

    } catch (error) {
        if (error instanceof ConflictError){
            return new Response(JSON.stringify({
                error: 'El usuario ya existe: ' + username
            }), {
                status: 403,
            })
        } else {
            return new Response(JSON.stringify({
                error: 'Internal server error'
            }), {
                status: 500,
            })
        }       
    }
}


