import { MessageType } from "@/app/types/message.type";
import Image from 'next/image'
import Link from "next/link";

type MessageProps = {
    message: MessageType
}

const Message = ({ message } : MessageProps) => {
    return (
        <div className="grid grid-cols-12">
            <div className="w-full mt-1 text-center mb-4 relative col-span-2 flex justify-center ite">
                <Image
                    priority
                    className="rounded-full"
                    src={message.user.photoUrl}
                    width={60}
                    height={60}
                    alt="Imagen de perfil"
                    />
            </div>
            <div className="flex flex-col mt-2 col-span-10">
                <div className="flex">
                    <h3>{message.user.name}</h3>
                    <div className="text-gray-600 text-sm ml-2 cursor-pointer">
                        <Link href={`/users/${message.user.username}`}>@{message.user.username}</Link>
                    </div>
                </div>
                <p className="text-xs">{message.message}</p>                
            </div>
        </div>
    );
};


export default Message