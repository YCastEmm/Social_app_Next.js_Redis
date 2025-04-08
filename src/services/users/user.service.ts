import { MessageType } from "@/app/types/message.type";
import { PageType } from "@/app/types/pagination.types";
import { UserType } from "@/app/types/user.types";
import { httpGetPublic } from "../common/http.service";



class UserApi {

    getUserData = async ( username: string) : Promise<UserType> => {
        return httpGetPublic(`/users/${username}`)
    }
    
    getUserMessages = async ( username: string) : Promise<PageType<MessageType>> => {
        return httpGetPublic(`/users/${username}/messages`)
    }

    getUserReplies = async ( username: string) : Promise<PageType<MessageType>> => {
        return httpGetPublic(`/users/${username}/messages/replies`)
    }
}


const userApi = new UserApi();

export default userApi