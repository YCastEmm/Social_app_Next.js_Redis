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

    loginInternal = async ( username: string, password: string) : Promise<LoginResponseType> => {
        return httpInternalApi.httpPostPublic(`/auth/login`, {username: username, password: password})
    }
}



const authApi = new AuthApi();
export default authApi