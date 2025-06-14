"use client";

import { MessageType } from "@/types/message.type";
import UserCard, { UserCardLayout } from "../users/UserCard";
import RepliesCounter from "../counters/RepliesCounter";
import { useRouter } from "next/navigation";

type MessageProps = {
    message: MessageType;
};

const Message = ({ message }: MessageProps) => {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm w-full mb-4">
            <UserCard user={message.user} layout={UserCardLayout.HORIZONTAL}>
                <div className="flex flex-col w-full">
                    <p className="text-sm text-gray-800 mb-2">{message.message}</p>

                    <div className="flex justify-end w-full mt-auto">
                        <RepliesCounter count={message.repliesCount} onClick={() => router.push(`/messages/${message.id}`)} />
                    </div>
                </div>
            </UserCard>
        </div>
    );
};

export default Message;
