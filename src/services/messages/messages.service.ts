import { MessageType } from "@/types/message.type";
import { PageType } from "@/types/pagination.types";
import httpInternalApi from "../common/http.internal.service";



class MessageApi {

    getMessageFeed = async ( page: number, size: number) : Promise<PageType<MessageType>> => {
        return httpInternalApi.httpGetPublic("/messages/feed",  new URLSearchParams({page: `${page}`, size: `${size}`}))}

    getMessage = async ( id: string) : Promise<MessageType> => {
        return httpInternalApi.httpGetPublic(`/messages/${id}` )}

    getMessageReplies = async ( id: string, page: number, size: number) : Promise<PageType<MessageType>> => {
        return httpInternalApi.httpGetPublic(`/messages/${id}/replies`,  new URLSearchParams({page: `${page}`, size: `${size}`}))}

    postMessage = async ( message: string, parentId?: string) : Promise<MessageType> => {
        return httpInternalApi.httpPost("/messages", { message: message, parentId: parentId ?? null })}

    getMessageByHash = async ( hashtag: string, page: number, size: number) : Promise<PageType<MessageType>> => {
        return httpInternalApi.httpGetPublic(`/messages/hash/${hashtag}`,  new URLSearchParams({page: `${page}`, size: `${size}`}))}
}



const messageAPI = new MessageApi()

export default messageAPI