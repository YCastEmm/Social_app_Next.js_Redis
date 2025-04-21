import { HttpBaseApi } from "./http.service"

const API_URL = "http://localhost:8080/api"
const API_PUBLIC_ENDPOINT = `/public`


class HttpInternalApi extends HttpBaseApi{
    constructor(){
        super(API_URL, API_PUBLIC_ENDPOINT)
    }
}

const httpInternalApi = new HttpInternalApi()
export default httpInternalApi
