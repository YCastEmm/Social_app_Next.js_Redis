"use client"

import { MessageType } from "@/types/message.type";
import Message from "../messages/Message";
import { useState } from "react";

enum TabView {
    MESSAGES,
    REPLIES,
}

type UserTabsProp = {
    messages: MessageType[];
    replies: MessageType[];
};

const UserTab = ({ messages, replies }: UserTabsProp) => {
    const [tab, setTab] = useState<TabView>(TabView.MESSAGES); // Manejo de pestañas: el estado guarda si se está mostrando "Mensajes" o "Respuestas"

    return (
        <>
            <div className="flex justify-evenly mb-5 w-full">
                <div 
                    onClick={() =>setTab(TabView.MESSAGES)}
                    className={`cursor-pointer ${tab === TabView.MESSAGES ? "border-b-2 border-blue-400" : ""}`}>
                    Mensajes
                </div>
                <div 
                    onClick={() =>setTab(TabView.REPLIES)}
                    className={`cursor-pointer ${tab === TabView.REPLIES ? "border-b-2 border-blue-400" : ""}`}>
                    Respuestas
                </div>
            </div>
            <div className="flex flex-col w-full">
                {tab === TabView.MESSAGES && messages.map((message, index) => <Message key={index} message={message} />)}
                {tab === TabView.REPLIES && replies.map((message, index) => <Message key={index} message={message} />)}
                <div />
            </div>
        </>
    );
};

export default UserTab;
