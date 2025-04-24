import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { AccessDeniedError } from "./services/common/errors";
import authApi from "./services/auth/auth.api";

// Middleware que intercepta las requests a /profile y chequea si hay sesión válida
export async function middleware(request: NextRequest) {
    // Obtengo las cookies de la request
    const cookieStore = await cookies();

    try {
        // Busco el ID de sesión (guardado en una cookie)
        const sessionId = cookieStore.get("SocialSessionID")?.value ?? "";
        if (!sessionId) {
            throw new AccessDeniedError("La sessionId ya no es válida");
        }

        const accessToken = await getAccessToken(sessionId);
        if (!accessToken) {
            throw new AccessDeniedError("La sessionId ya no es válida");
        }
        return getAuthenticationHeaders(request, accessToken);

    } catch (error) {
        // Si algo falla (por ej., error al consultar el servicio), también redirijo al login
        return NextResponse.redirect(new URL("/login", request.url));
    }
}


const getAccessToken = async (sessionId: string) : Promise<string>=> {
    return (await authApi.getRedisValue(sessionId)).value
};

const getAuthenticationHeaders = (request: NextRequest, accessToken: string) => {
    // Si pasó los chequeos, agrego headers personalizados a la request
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-social-access-token", accessToken);

    // Continuo con la request normal, pero con headers modificados
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
};

// Configuro el middleware para que se aplique solo en la ruta /profile
export const config = {
    matcher: "/profile",
};
