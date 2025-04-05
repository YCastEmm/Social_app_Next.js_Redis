import Message from "@/components/messages/Message";
import Link from "next/link";

const MessagePage = () => {
    const messages = [
        {
            initials: "HS",
            name: "Han Solo",
            username: "hansolo",
            message: "Primer mensaje",
        },
        {
            initials: "AS",
            name: "Anakin Skywalker",
            username: "anakin",
            message: "Segundo mensaje",
        }
    ];

    return (
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8"></section>
            <div>
                {messages.map((message, index) => (
                <Message key={index} message={message} />

                ))}
                <div />
            </div>
        </main>
        
    );
};

export default MessagePage;
