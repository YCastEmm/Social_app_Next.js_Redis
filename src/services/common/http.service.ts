import { AccessDeniedError } from "./errors"


export class HttpBaseApi {

    protected privateEndpoint: string
    protected publicEndpointSuffix: string

    constructor(privateEndpoint: string, publicEndpointSuffix: string){
        this.privateEndpoint = privateEndpoint
        this.publicEndpointSuffix = publicEndpointSuffix
    }

    async httpGet<T> (endpointSuffix : string, params?: URLSearchParams) : Promise<T> {
        const res = await fetch(`${this.privateEndpoint}${endpointSuffix}${params ? `?${params}` : "" }`,
            {   
                cache: "no-cache"
            })
        if (!res.ok) {
            throw new Error("Falló el httpGet en el endpoint: "+ endpointSuffix)
        }
        return res.json()
    }
    
    async httpGetPublic<T> (endpointSuffix : string, params?: URLSearchParams) : Promise<T> { 
        return this.httpGet(`${this.publicEndpointSuffix}${endpointSuffix}`, params)
    }
    

    async httpPost<T>(endpointSuffix : string, body: object) : Promise<T> { 
        const res = await fetch(`${this.privateEndpoint}${endpointSuffix}`,
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
    
        if (!res.ok) {
            if(res.status === 403){
                throw new AccessDeniedError("El usuario no tiene acceso")
            }
            throw new Error("Falló el httpPost en el endpoint: "+ endpointSuffix)
        }
        return res.json()
    }


    async httpPostPublic<T> (endpointSuffix : string, body: object) : Promise<T> { 
        return this.httpPost(`${this.publicEndpointSuffix}${endpointSuffix}`, body)
    
    }
}    





