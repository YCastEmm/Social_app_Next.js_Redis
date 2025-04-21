import { TrendingUserType, UserType } from "@/types/user.types";

import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";




export enum UserCardLayout {
    HORIZONTAL,
    VERTICAL
}

const divClasses = {
    [UserCardLayout.HORIZONTAL]: "flex",
    [UserCardLayout.VERTICAL]: "flex flex-col"
}

const linkClasses = {
    [UserCardLayout.HORIZONTAL]: "ml-2 text-gray-600 text-sm cursor-pointer",
    [UserCardLayout.VERTICAL]: "text-gray-600 text-sm cursor-pointer"
}

type UserCardProps = PropsWithChildren & {
    user: TrendingUserType | UserType
    layout: UserCardLayout
}

const UserCard = ({user, layout, children}: UserCardProps) => { 
    return  <div className="grid grid-cols-12 mb-2">
                <div className="w-full h-full mt-1 text-center mb-4 relative col-span-2 flex items-start">
                    <Image
                        priority
                        className="rounded-full"
                        src={user.photoUrl}
                        width={60}
                        height={60}
                        alt={user.name}/>
                </div>
                <div className="flex flex-col mt-2 col-span-10">
                    <div className={divClasses[layout]}>
                        <h3>{user.name}</h3>
                        <div className={linkClasses[layout]}>
                            <Link href={`/users/${user.username}`}>@{user.username}</Link>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
}


export default UserCard