"use client";

import { TrendingHashtagType } from "@/app/types/hash.types";
import { MessageType } from "@/app/types/message.type";
import { PageType } from "@/app/types/pagination.types";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./Message";
import { useState } from "react";
import messageAPI from "@/services/messages/messages.service";

type MessageFeedProps = {
    initialMessages: PageType<MessageType>
};

const MessageFeed = ({ initialMessages }: MessageFeedProps) => {

    const [ messagesResponse, setMessagesResponse ] = useState<PageType<MessageType>>(initialMessages)
    const [ messages, setMessages ] = useState<MessageType[]>(initialMessages.content)
    const [ hasMore, setHasMore ] = useState<boolean>(!initialMessages.pagination.last)


    const fetchData = async () =>{
        const page = messagesResponse.pagination.page + 1
        const response = await  messageAPI.getMessageFeed(page, 10)
        setMessagesResponse(response)
        setMessages([...messages, ...response.content])
        setHasMore(!response.pagination.last)
    }

    const refresh = async () =>{
        const response = await  messageAPI.getMessageFeed(0, 10)
        setMessagesResponse(response)
        setMessages(response.content)
    }

    return (
        <InfiniteScroll
            dataLength={messages.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Cargando feed...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Llegaste al final del feed.</b>
                </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8595; Arrastra hacia abajo para refrescar</h3>}
            releaseToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8593; Suelta para refrescar</h3>}
        >
            {messages.map((message, index) => (
                <Message key={`message-${index}`} message={message} />
            ))}
        </InfiniteScroll>
    );
};

export default MessageFeed;
