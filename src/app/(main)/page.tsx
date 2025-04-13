import MessageFeed from "@/components/messages/MessageFeed";
import messageAPI from "@/services/messages/messages.service";

const MessagesPage = async () => {

    const messagesResponse = await messageAPI.getMessageFeed(0, 10);

    const fetchData = () =>{

    }

    return (
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
                <MessageFeed initialMessages={messagesResponse}></MessageFeed>
            </section>
        </main>
    );
};

export default MessagesPage;
