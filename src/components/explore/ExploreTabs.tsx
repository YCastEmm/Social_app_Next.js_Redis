"use client"

import { TrendingHashtagType } from "@/types/hash.types";
import { TrendingUserType } from "@/types/user.types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import UserList from "../users/UserList";
import { PageType } from "@/types/pagination.types";
import MessageHasthtagList from "../messages/MessageHashtagList";

enum TabView {
    HASHTAG,
    USERS,
}

type ExploreTabsProp = {
    hashtags: PageType<TrendingHashtagType>;
    users: PageType<TrendingUserType>;
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
        <div className="bg-white rounded-xl shadow p-5 w-full">
            <div className="flex justify-evenly mb-5 bg-white">
                <Link href="/explore?type=HASHTAG">
                    <div 
                        className={`cursor-pointer text-lg ${tab === TabView.HASHTAG ? "border-b-2 border-indigo-400" : ""}`}>
                        Mensajes
                    </div>
                </Link>
                <Link href="/explore?type=USERS">
                    <div 
                        className={`cursor-pointer text-lg ${tab === TabView.USERS ? "border-b-2 border-indigo-400" : ""}`}>
                        Usuarios
                    </div>
                </Link>
            </div>
            <div>
                { tab === TabView.HASHTAG && <MessageHasthtagList initialHashtagPage={hashtags} /> }
                { tab === TabView.USERS && <UserList initialUserPage={users} /> }
                <div />
            </div>
        </div>
    );
};

export default ExploreTab;

