"use client";

// Este componente es Client Component porque necesito usar hooks de React y el MessageProvider.
// Separé esta lógica del componente page.tsx (que es Server Component) para poder hacer el fetch del lado del servidor
// y luego pasarle los datos ya cargados a este contenedor interactivo.


import { MessageType } from "@/app/types/message.type";
import { PageType } from "@/app/types/pagination.types";
import Message from "@/components/messages/Message";
import MessageList from "@/components/messages/MessageList";
import MessagePostForm from "@/components/messages/MessagePostForm";
import useMessages, { MessageProvider } from "@/contexts/message.context";

type MessagePageProps = {
    repliesPage: PageType<MessageType>;
    message: MessageType;
    parentId?: string;
};


const MessageContainer = () =>{
    const { message } = useMessages()
    if (!message) {
        return <></>
    }
    return  <section className="flex flex-col mb-8">
                <Message message={message} />
            </section>
}

const MessagePageContainer = ({ message, repliesPage, parentId }: MessagePageProps) => {
    return (
        <MessageProvider initialPage={repliesPage} initialMessage={message}>
            <MessageContainer />
            <section>
                <MessagePostForm parentId={parentId}></MessagePostForm>
            </section>
            <section className="flex flex-col w-full">
                <MessageList />
            </section>
        </MessageProvider>
    );
};

export default MessagePageContainer