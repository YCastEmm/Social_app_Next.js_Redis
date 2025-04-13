import { MessageType } from "@/app/types/message.type";
import { PageType } from "@/app/types/pagination.types";
import { httpGetPublic } from "../common/http.service";



class MessageApi {

    getMessageFeed = async ( page: number, size: number) : Promise<PageType<MessageType>> => {
        return httpGetPublic("/messages/feed",  new URLSearchParams({page: `${page}`, size: `${size}`}))
}}


const messageAPI = new MessageApi()

export default messageAPI