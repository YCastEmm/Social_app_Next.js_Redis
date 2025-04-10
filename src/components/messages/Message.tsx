import { MessageType } from "@/app/types/message.type";
import UserCard, { UserCardLayout } from "../users/UserCard";

type MessageProps = {
    message: MessageType;
};

const Message = ({ message }: MessageProps) => {
    return (
        <UserCard user={message.user} layout={UserCardLayout.HORIZONTAL}>
            <p className="text-xs">{message.message}</p>
        </UserCard>
    );
};

export default Message;
