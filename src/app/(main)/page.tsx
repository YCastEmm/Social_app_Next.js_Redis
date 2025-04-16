import messageAPI from "@/services/messages/messages.service";
import IndexPageContainer from "./page.container";

const IndexPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

    const { query } = await searchParams;

    const messageResponse = 
        query ? 
        await messageAPI.getMessageByHash(query, 0, 10)
        : await messageAPI.getMessageFeed(0, 20);
    


    return (
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
                <IndexPageContainer 
                    initialQuery={query}
                    messageResponse={messageResponse}
                />
            </section>
        </main>
    );
};

export default IndexPage;
