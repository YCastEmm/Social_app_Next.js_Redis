import Link from "next/link";
import { TrendingUserType } from "@/types/user.types";
import UserCard, { UserCardLayout } from "../users/UserCard";

type ExploreUsersProps = {
    users: TrendingUserType[];
};

const ExploreUsers = ({ users }: ExploreUsersProps) => {
    if (!users || users.length === 0) {
        return <></>;
    }

    return (
        <div className="sidebar-box" style={{ minWidth: 240 }}>
            <h2 className="mb-3 text-lg font-semibold text-gray-800">A quién seguir</h2>

            {users.slice(0, 4).map((user, index) => (
                <UserCard key={`trending-user-${index}`} user={user} layout={UserCardLayout.HORIZONTAL} />
            ))}

            {users.length > 4 && (
                <Link href={"/explore?type=USERS"}>
                    <div className="text-center mt-4 link-primary">Ver más</div>
                </Link>
            )}
        </div>
    );
};

export default ExploreUsers;
