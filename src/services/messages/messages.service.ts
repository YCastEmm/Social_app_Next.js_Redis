import { MessageType } from "@/app/types/message.type";
import { PageType } from "@/app/types/pagination.types";
import { httpGetPublic, httpPost } from "../common/http.service";



class MessageApi {

    getMessageFeed = async ( page: number, size: number) : Promise<PageType<MessageType>> => {
        return httpGetPublic("/messages/feed",  new URLSearchParams({page: `${page}`, size: `${size}`}))}

    getMessage = async ( id: string) : Promise<MessageType> => {
        return httpGetPublic(`/messages/${id}` )}

    getMessageReplies = async ( id: string, page: number, size: number) : Promise<PageType<MessageType>> => {
        return httpGetPublic(`/messages/${id}/replies`,  new URLSearchParams({page: `${page}`, size: `${size}`}))}

    postMessage = async ( message: string, parentId?: string) : Promise<MessageType> => {
        return httpPost("/messages", { message: message, parentId: parentId ?? null })}
}


const messageAPI = new MessageApi()

export default messageAPI