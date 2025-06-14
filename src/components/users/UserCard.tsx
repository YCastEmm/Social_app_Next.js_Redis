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
            <Image priority className="rounded-full object-cover" src={user.photoUrl} width={48} height={48} alt={user.name} />

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
