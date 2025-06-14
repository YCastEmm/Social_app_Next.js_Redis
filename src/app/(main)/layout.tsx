import ExploreTrending from "@/components/explore/ExploreTrending";
import ExploreUsers from "@/components/explore/ExploreUsers";
import Menu from "@/components/menu/Menu";
import exploreApi from "@/services/explore/explore.service";
import { headers } from "next/headers";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";


const LINKS  = [
    { title: "Inicio", href: "/" },
    { title: "Explorar", href: "/explore" },
    { title: "Perfil", href: "/profile" },
]

const UsersLayout: FC<PropsWithChildren> = async ({ children }) => {

    const hashesPromise = exploreApi.getTrendingHashtags(0, 3)
    
    const accessToken = (await headers()).get("x-social-access-token") ?? null
    const usersPromise = accessToken ? await exploreApi.getMyFollowRecommendations(0, 5, accessToken) : exploreApi.getFollowRecommendations(0, 5)
    

    const [hashes, users ] = await Promise.all([hashesPromise, usersPromise])
    
    return (
        <div  className="w-full h-full grid grid-cols-12 gap-4 px-4">
            <div className="col-span-2 py-4">
                <Menu links={LINKS}></Menu>
            </div>
            <main className="col-span-8">{children}</main>
            <div className="col-span-2 py-4">
                <div className="mb-4">
                    <ExploreTrending hashes={hashes.content}></ExploreTrending>
                </div>
                <div className="mb-4">
                    <ExploreUsers users={users.content}></ExploreUsers>
                </div>                
            </div>
        </div>
    );
};

export default UsersLayout;
