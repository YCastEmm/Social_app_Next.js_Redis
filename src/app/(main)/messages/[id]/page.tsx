import Message from "@/components/messages/Message";
import MessagePostForm from "@/components/messages/MessagePostForm";
import messageAPI from "@/services/messages/messages.service";

const MessagePage = async ({ params }: { params: Promise<{ id: string, parentId: string }> }) => {
    const { id } = await params;


    const repliesPagePromise = messageAPI.getMessageReplies(id, 0, 10);
    const messagePromise = messageAPI.getMessage(id);

    const [repliesPage, message] = await Promise.all([repliesPagePromise, messagePromise])

    return (
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
                <Message message={message} />
            </section>
            <section>
                <MessagePostForm parentId={id}></MessagePostForm>                
            </section>
            <section className="flex flex-col w-full">
                {repliesPage.content.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </section>
        </main>
    );
};

export default MessagePage;
