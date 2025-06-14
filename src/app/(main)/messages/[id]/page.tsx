

import messageAPI from "@/services/messages/messages.service";
import MessagePageContainer from "./page.container";
import userApi from "@/services/users/user.service";
import { headers } from "next/headers";

const MessagePage = async ({ params }: { params: Promise<{ id: string, parentId: string }> }) => {
    const { id } = await params;

    const accessToken = (await headers()).get("x-social-access-token") ?? null
    const currentUser = accessToken ? await userApi.getMeInternal(accessToken) : undefined

    const repliesPagePromise = messageAPI.getMessageReplies(id, 0, 10);
    const messagePromise = messageAPI.getMessage(id);

    const [repliesPage, message] = await Promise.all([repliesPagePromise, messagePromise])

    return (
        <main className="flex flex-col bg-gray-100 pt-8">
            <MessagePageContainer 
                message={message} 
                parentId={id}
                repliesPage={repliesPage}
                currentUser={currentUser}
            />
        </main>
    );
};

export default MessagePage;
