import httpExternalApi from "../common/http.external.service";
import httpInternalApi from "../common/http.internal.service";
import { LoginResponseType } from "@/types/auth.types";



class AuthApi {

    login = async ( username: string, password: string) : Promise<LoginResponseType> => {
        return httpExternalApi.httpPost(`/auth/login`, {username: username, password: password})
    }

    loginInternal = async ( username: string, password: string) : Promise<LoginResponseType> => {
        return httpInternalApi.httpPostPublic(`/auth/login`, {username: username, password: password})
    }
}




const authApi = new AuthApi();

export default authApi