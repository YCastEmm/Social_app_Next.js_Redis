import { MessageType } from "@/types/message.type";
import { PageType } from "@/types/pagination.types";
import { UserType } from "@/types/user.types";
import httpInternalApi from "../common/http.internal.service";



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
}


const userApi = new UserApi();

export default userApi