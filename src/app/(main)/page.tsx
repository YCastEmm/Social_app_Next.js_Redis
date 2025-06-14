import messageAPI from "@/services/messages/messages.service";
import IndexPageContainer from "./page.container";
import { headers } from "next/headers";
import userApi from "@/services/users/user.service";

const IndexPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

    const { query } = await searchParams;

    const accessToken = (await headers()).get("x-social-access-token") ?? null
    const currentUser = accessToken ? await userApi.getMeInternal(accessToken) : undefined
    
    const messageResponse = 
        query ? 
        await messageAPI.getMessageByHash(query, 0, 10)
        : await messageAPI.getMessageFeed(0, 20);
    


    return (
        <main className="flex flex-col bg-gray-100 pb-8 pt-0">
            <section className="flex flex-col mb-8">
                <IndexPageContainer 
                    initialQuery={query}
                    messageResponse={messageResponse}
                    currentUser={currentUser}
                />
            </section>
        </main>
    );
};

export default IndexPage;
