"use client"

import { TrendingHashtagType } from "@/app/types/hash.types";
import { TrendingUserType } from "@/app/types/user.types";
import { useEffect, useState } from "react";
import UserCard, { UserCardLayout } from "../users/UserCard";
import MessageHashtag from "../messages/MessageHashtag";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

enum TabView {
    HASHTAG,
    USERS,
}

type ExploreTabsProp = {
    hashtags: TrendingHashtagType[];
    users: TrendingUserType[];
    initialTab?: string | undefined;
};

const ExploreTab = ({ hashtags, users, initialTab }: ExploreTabsProp) => {

    const searchParams = useSearchParams()
    
    const [tab, setTab] = useState<TabView>(initialTab ? TabView[initialTab as keyof typeof TabView] : TabView.HASHTAG ); // Manejo de pestañas: el estado guarda si se está mostrando "Mensajes" o "Respuestas"
    
    useEffect(()=>{
        const type = searchParams.get("type")
        setTab(type ? TabView[type as keyof typeof TabView] : tab )
    },[searchParams])

    
    return (
        <>
            <div className="flex justify-evenly mb-5">
                <Link href="/explore?type=HASHTAG">
                    <div 
                        className={`cursor-pointer ${tab === TabView.HASHTAG ? "border-b-2 border-blue-400" : ""}`}>
                        Mensajes
                    </div>
                </Link>
                <Link href="/explore?type=USERS">
                    <div 
                        className={`cursor-pointer ${tab === TabView.USERS ? "border-b-2 border-blue-400" : ""}`}>
                        Usuarios
                    </div>
                </Link>
            </div>
            <div>
                {tab === TabView.HASHTAG && hashtags.map((hashtag, index) => 
                    <MessageHashtag hash={hashtag} key={`explore-hashtag-${index}`} />)}
                {tab === TabView.USERS && users.map((user, index) => 
                    <UserCard user={user} key={`explore-user-${index}`} layout={UserCardLayout.VERTICAL} />)}
                <div />
            </div>
        </>
    );
};

export default ExploreTab;
