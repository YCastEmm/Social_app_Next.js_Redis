import { MessageType } from "@/app/types/message.type";
import Link from "next/link";

type MessageProps = {
    message: MessageType
}

const Message = ({ message } : MessageProps) => {



    return (
        <div className="flex mb-3">
            <div className="rounded-full bg-gray-300 w-16 p-4 font-semibold text-md text-center">{message.initials}</div>
            <div className="flex flex-col ml-4 mt-2">
                <div className="flex">
                    <h3>{message.name}</h3>
                    <div className="text-gray-600 text-sm ml-2 cursor-pointer">
                        <Link href={`/users/${message.username}`}>@{message.username}</Link>
                    </div>
                </div>
                <p className="text-xs">{message.message}</p>
            </div>
        </div>
    );
};


export default Message