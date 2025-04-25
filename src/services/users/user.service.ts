import { MessageType } from "@/types/message.type";
import { PageType } from "@/types/pagination.types";
import { TrendingUserType, UserType } from "@/types/user.types";
import httpInternalApi from "../common/http.internal.service";
import httpExternalApi from "../common/http.external.service";



class UserApi {

    getUserData = async ( username: string) : Promise<UserType> => {
        return httpInternalApi.httpGetPublic(`/users/${username}`)
    }
    
    getUserMessages = async ( username: string) : Promise<PageType<MessageType>> => {
        return httpInternalApi.httpGetPublic(`/users/${username}/messages`)
    }

    getUserReplies = async ( username: string) : Promise<PageType<MessageType>> => {
        return httpInternalApi.httpGetPublic(`/users/${username}/messages/replies`)
    }

    getMeInternal = async ( accessToken: string) : Promise<UserType> => {
        return httpInternalApi.httpGet(`/me`, undefined, accessToken)
    }

    getUserFollowers = async ( username: string) : Promise<PageType<TrendingUserType>> => {
        return httpInternalApi.httpGetPublic(`/users/${username}/followers`)
    }
    getUserFollowing = async ( username: string) : Promise<PageType<TrendingUserType>> => {
        return httpInternalApi.httpGetPublic(`/users/${username}/following`)
    }
}


const userApi = new UserApi();

export default userApi