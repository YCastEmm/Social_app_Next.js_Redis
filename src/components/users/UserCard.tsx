import { TrendingUserType, UserType } from "@/types/user.types";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

export enum UserCardLayout {
    HORIZONTAL,
    VERTICAL,
}

type UserCardProps = PropsWithChildren & {
    user: TrendingUserType | UserType;
    layout: UserCardLayout;
};

const UserCard = ({ user, layout, children }: UserCardProps) => {
    const isHorizontal = layout === UserCardLayout.HORIZONTAL;

    return (
        <div className={`flex w-full ${isHorizontal ? "flex-row items-start gap-3" : "flex-col items-start"} mb-4`}>
            <div className="w-12 h-12 min-w-12 min-h-12 rounded-full overflow-hidden shadow-md flex-shrink-0 border-indigo-400 border-[2px] mt-1">
                <Image
                    src={user.photoUrl}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    priority
                />
            </div>


            <div className={`flex flex-col w-full ${isHorizontal ? "mt-1" : ""}`}>
                <h3 className="text-sm font-semibold">{user.name}</h3>
                <Link href={`/users/${user.username}`} className="text-sm text-gray-500 hover:text-indigo-600">
                    @{user.username}
                </Link>
                {children}
            </div>
        </div>
    );
};

export default UserCard;
