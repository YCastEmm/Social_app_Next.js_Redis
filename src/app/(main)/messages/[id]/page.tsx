

import messageAPI from "@/services/messages/messages.service";
import MessagePageContainer from "./page.container";

const MessagePage = async ({ params }: { params: Promise<{ id: string, parentId: string }> }) => {
    const { id } = await params;


    const repliesPagePromise = messageAPI.getMessageReplies(id, 0, 10);
    const messagePromise = messageAPI.getMessage(id);

    const [repliesPage, message] = await Promise.all([repliesPagePromise, messagePromise])

    return (
        <main className="flex flex-col bg-gray-100 p-8">
            <MessagePageContainer 
                message={message} 
                parentId={id}
                repliesPage={repliesPage}
            />
        </main>
    );
};

export default MessagePage;
