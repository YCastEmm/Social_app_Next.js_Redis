"use client";

import { MessageType } from "@/types/message.type";
import Message from "../messages/Message";
import { useState } from "react";
import { TrendingUserType } from "@/types/user.types";
import UserCard, { UserCardLayout } from "./UserCard";

enum TabView {
    MESSAGES,
    REPLIES,
    FOLLOWERS,
    FOLLOWING,
}

type UserTabsProp = {
    messages: MessageType[];
    replies: MessageType[];
    following: TrendingUserType[];
    followers: TrendingUserType[];
};

const UserTab = ({ messages, replies, followers, following }: UserTabsProp) => {
    const [tab, setTab] = useState<TabView>(TabView.MESSAGES); // Manejo de pestañas: el estado guarda si se está mostrando "Mensajes" o "Respuestas"

    return (
        <>
            <div className="flex justify-evenly mb-5 w-full">
                <div onClick={() => setTab(TabView.MESSAGES)} className={`cursor-pointer ${tab === TabView.MESSAGES ? "border-b-2 border-blue-400" : ""}`}>
                    Mensajes
                </div>
                <div onClick={() => setTab(TabView.REPLIES)} className={`cursor-pointer ${tab === TabView.REPLIES ? "border-b-2 border-blue-400" : ""}`}>
                    Respuestas
                </div>
                <div onClick={() => setTab(TabView.FOLLOWERS)} className={`cursor-pointer ${tab === TabView.FOLLOWERS ? "border-b-2 border-blue-400" : ""}`}>
                    Seguidores
                </div>
                <div onClick={() => setTab(TabView.FOLLOWING)} className={`cursor-pointer ${tab === TabView.FOLLOWING ? "border-b-2 border-blue-400" : ""}`}>
                    Siguiendo
                </div>
            </div>
            <div className="flex w-full flex-col">
                {tab === TabView.MESSAGES && messages.map((message, index) => <Message key={`${index}`} message={message} />)}
                {tab === TabView.REPLIES && replies.map((message, index) => <Message key={`${index}`} message={message} />)}
                {tab === TabView.FOLLOWERS && followers.map((user, index) => <UserCard user={user} key={`follower-user-${index}`} layout={UserCardLayout.VERTICAL} />)}
                {tab === TabView.FOLLOWING && following.map((user, index) => <UserCard user={user} key={`following-user-${index}`} layout={UserCardLayout.VERTICAL} />)}
            </div>
        </>
    );
};

export default UserTab;
