import { MessageType } from "@/app/types/message.type";
import { PageType } from "@/app/types/pagination.types";
import messageAPI from "@/services/messages/messages.service";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type MessageState = {
    message?: MessageType
    messages: MessageType[]
    messagePage: PageType<MessageType>,
    postMessage: (message: string, parentId?: string) => {}
    fetchNextPage: () => void
    refresh: () => void
};

type MessageProviderProps = PropsWithChildren & {
    initialPage: PageType<MessageType> 
    initialMessage?: MessageType
};

const MessageContext = createContext<MessageState | undefined>(undefined);



export const MessageProvider: FC<MessageProviderProps> = ({initialPage, initialMessage, children }) => {

    const [message, setMessage] = useState<MessageType | undefined>(initialMessage)
    const [ messages, setMessages ] = useState<MessageType[]>(initialPage.content)
    const [messagePage, setMessagePage] = useState<PageType<MessageType>>(initialPage)


    useEffect(()=>{
            setMessagePage(initialPage)
            setMessages(initialPage.content)
    },[initialPage])

    const postMessage = useCallback( async (textMessage: string, parentId?: string) =>{
        const response = await messageAPI.postMessage(textMessage, parentId);
        setMessages([response, ...messagePage.content])
        
        if (message && message?.id === parentId) {
            setMessage({
                ...message,
                repliesCount: message?.repliesCount + 1
            })
        }
    },[messagePage, message])

    
    const fetchNextPage = useCallback(async () =>{
            const page = messagePage.pagination.page + 1
            const response = await  messageAPI.getMessageFeed(page, 10)
            setMessagePage(response)
            setMessages([...messages, ...response.content])
        }, [messagePage.pagination.page, messages])
    
    const refresh = useCallback(async () =>{
        const response = await  messageAPI.getMessageFeed(0, 10)
        setMessagePage(response)
        setMessages(response.content)
    }, [])


    const value = useMemo(() => {
        return { 
                    messagePage, 
                    postMessage, 
                    message,
                    messages,
                    refresh,
                    fetchNextPage
                }
    }, [messagePage, postMessage, message, messages, refresh, fetchNextPage]);

    return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

const useMessages = (): MessageState => {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error("useMessages se debe usar dentro de un MessageProvider");
    }

    return context;
};

export default useMessages;
