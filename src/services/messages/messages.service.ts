import { MessageType } from "@/app/types/message.type";
import { PageType } from "@/app/types/pagination.types";
import { httpGetPublic, httpPost } from "../common/http.service";



class MessageApi {

    getMessageFeed = async ( page: number, size: number) : Promise<PageType<MessageType>> => {
        return httpGetPublic("/messages/feed",  new URLSearchParams({page: `${page}`, size: `${size}`}))}

    postMessage = async ( message: string) : Promise<MessageType> => {
        return httpPost("/messages", {message: message})}

}


const messageAPI = new MessageApi()

export default messageAPI