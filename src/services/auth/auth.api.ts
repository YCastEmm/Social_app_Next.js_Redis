import httpExternalApi from "../common/http.external.service";
import httpInternalApi from "../common/http.internal.service";
import { LoginResponseType, RedisResponseType } from "@/types/auth.types";

class AuthApi {

    getRedisValue = async ( key: string) : Promise<RedisResponseType> => {
        return httpExternalApi.httpGet(`/redis`, new URLSearchParams({key}), process.env.REDIS_API_TOKEN)
    }

    login = async ( username: string, password: string) : Promise<LoginResponseType> => {
        return httpExternalApi.httpPost(`/auth/login`, {username: username, password: password})
    }

    register = async ( username: string, password: string, name: string, photoUrl: string) : Promise<LoginResponseType> => {
        return httpExternalApi.httpPost(`/auth/register`, {username, password, name, photoUrl})
    }

    logout = async () : Promise<LoginResponseType> => {
        return httpExternalApi.httpPost(`/auth/logout`, {})
    }

    loginInternal = async ( username: string, password: string) : Promise<LoginResponseType> => {
        return httpInternalApi.httpPostPublic(`/auth/login`, {username: username, password: password})
    }

    registerInternal = async ( username: string, password: string, name: string, photoUrl: string) : Promise<LoginResponseType> => {
        return httpInternalApi.httpPostPublic(`/auth/register`, { username, password, name, photoUrl })
    }
}



const authApi = new AuthApi();
export default authApi