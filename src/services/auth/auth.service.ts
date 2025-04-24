import { AccessDeniedError } from "../common/errors";
import { AuthResponseType, LoginResponseType } from "@/types/auth.types";
import { createClient, RedisClientType } from "redis";
import {v4 as uuidv4} from "uuid"
import authApi from "./auth.api";


const TEN_MINUTES = 60 * 10



class AuthService {

    private client : RedisClientType;

    constructor(){
        this.client = createClient({
            url: 'redis://default:SocialNetworkPass@localhost:6379'
        })
        
        this.client.connect().then(() =>{
            console.log("Connected to Redis")
        })
    }


    async authenticate(username: string, password: string) : Promise<AuthResponseType> {
        
            
        const loginResponse = await authApi.loginInternal(username, password)
        const sessionId = uuidv4()  
        const now = new Date()
        const expireAt = new Date(now.getTime() + TEN_MINUTES * 1000).toUTCString()

        this.client.set(sessionId, loginResponse.accessToken, {
            EX: TEN_MINUTES
        })

        return {
            sessionId, 
            user: loginResponse.user,
            expireAt
        }            
    }

    async getAccessToken(sessionId: string) : Promise<string> {
        if (!sessionId) {
            throw new AccessDeniedError("La sessionId ya no es válida")
        }
        
        const accessToken = await this.client.get(sessionId)
        if (!accessToken) {
            throw new AccessDeniedError("La sessionId ya no es válida")
        }
        return accessToken
    }

    async getRedisValue(key: string) : Promise<string |  null> {
        return await this.client.get(key)
    }
}





const authService = new AuthService();
export default authService