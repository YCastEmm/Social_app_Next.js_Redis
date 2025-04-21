import { HttpBaseApi } from "./http.service"

const API_URL = "http://localhost:3000/api"
const API_PUBLIC_ENDPOINT = `/public`


class HttpExternalApi extends HttpBaseApi{
    constructor(){
        super(API_URL, API_PUBLIC_ENDPOINT)
    }
}

const httpExternalApi = new HttpExternalApi()
export default httpExternalApi
