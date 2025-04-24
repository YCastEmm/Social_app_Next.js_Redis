import { AccessDeniedError } from "@/services/common/errors";
import * as yup from "yup"; // Librería para validaciones por esquema
import authService from "@/services/auth/auth.service";
import { cookies } from "next/headers";

const schema = yup
    .object({
        username: yup.string().required(), // campo obligatorio
        password: yup.string().required(), // campo obligatorio
    })
    .required();

export async function POST(request: Request) {
    const { username, password } = await schema.validate(await request.json()); // Como next no me deja tipar el username y password, uso el validador de YUP

    try {
        const loginResponse = await authService.authenticate(username, password);

        const cookieStore = await cookies();

        cookieStore.set({
            name: "SocialSessionID",
            value: loginResponse.sessionId,
            httpOnly: true,
            secure: true,
            path: "/",
            expires: new Date(loginResponse.expireAt),
            domain: "localhost", // opcional, y solo si estás local
        });

        cookieStore.set({
            name: "SocialUsername",
            value: loginResponse.user.username,
            secure: true,
            path: "/",
            expires: new Date(loginResponse.expireAt),
            domain: "localhost",
        });

        return new Response(JSON.stringify(loginResponse.user), {
            status: 200,
        });
        
    } catch (error) {
        if (error instanceof AccessDeniedError) {
            return new Response(
                JSON.stringify({
                    error: "Invalid credentials for user: " + username,
                }),
                {
                    status: 403,
                }
            );
        } else {
            return new Response(
                JSON.stringify({
                    error: "Internal server error",
                }),
                {
                    status: 500,
                }
            );
        }
    }
}
