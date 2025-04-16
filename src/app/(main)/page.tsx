import MessageFeed from "@/components/messages/MessageFeed";
import MessagePostForm from "@/components/messages/MessagePostForm";
import SearchBar from "@/components/search/SearchBar";
import messageAPI from "@/services/messages/messages.service";

const IndexPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

    const { query } = await searchParams;

    const messagesResponse = 
        query ? 
        await messageAPI.getMessageByHash(query, 0, 10)
        : await messageAPI.getMessageFeed(0, 20);
    


    return (
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
                <SearchBar initialQuery={query}/>
                <MessagePostForm></MessagePostForm>                
                <MessageFeed initialMessages={messagesResponse}></MessageFeed>
            </section>
        </main>
    );
};

export default IndexPage;
