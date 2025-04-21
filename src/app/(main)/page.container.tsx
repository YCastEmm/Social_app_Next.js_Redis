"use client"

// Este componente es Client Component porque necesito usar hooks de React y el MessageProvider.
// Separé esta lógica del componente page.tsx (que es Server Component) para poder hacer el fetch del lado del servidor
// y luego pasarle los datos ya cargados a este contenedor interactivo.


import MessageFeed from "@/components/messages/MessageFeed";
import MessagePostForm from "@/components/messages/MessagePostForm";
import SearchBar from "@/components/search/SearchBar";
import { MessageProvider } from "@/contexts/message.context";
import { MessageType } from "../../types/message.type";
import { PageType } from "../../types/pagination.types";

type IndexPageContainerProps = {
    initialQuery?: string,
    messageResponse: PageType<MessageType>
}


const IndexPageContainer = async ({initialQuery, messageResponse} : IndexPageContainerProps) => {

    return (
        <MessageProvider initialPage={messageResponse}>
            <SearchBar initialQuery={initialQuery}/>
            <MessagePostForm />
            <MessageFeed />
        </MessageProvider>
    );
};

export default IndexPageContainer;
