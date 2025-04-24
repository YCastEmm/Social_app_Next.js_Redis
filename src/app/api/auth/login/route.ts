
import authApi from "@/services/auth/auth.service";
import { AccessDeniedError } from "@/services/common/errors";
import { createClient } from "redis";
import * as yup from "yup" // Librería para validaciones por esquema
import {v4 as uuidv4} from "uuid"
import authService from "@/services/auth/auth.service";

const schema = yup
    .object({
        username: yup.string().required(), // campo obligatorio
        password: yup.string().required(), // campo obligatorio
    })
    .required()


export async function POST(request: Request){
    
    const {username, password} = await schema.validate(await request.json()) // Como next no me deja tipar el username y password, uso el validador de YUP
    
    
    try {
        const loginResponse = await authService.authenticate(username, password)
        const authCookie = `SocialSessionID=${loginResponse.sessionId}; Expires=${loginResponse.expireAt}; Domain=localhost; Secure; HttpOnly; Path=/`

        return new Response(JSON.stringify(loginResponse.user), {
            status: 200,
            headers: {"Set-Cookie": authCookie}
        })

    } catch (error) {
        if (error instanceof AccessDeniedError){
            return new Response(JSON.stringify({
                error: 'Invalid credentials for user: ' + username
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


