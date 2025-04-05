import Message from "@/components/messages/Message";
import UserTab from "@/components/users/UserTabs";
import Link from "next/link";

const UserPage = ({ params }: { params: { username: string } }) => {
    const user = {
        username: params.username,
        initials: "AS",
        name: "Anakin Skywalker",
        bio: "Vengo de Tatooine",
        followersCount: 15,
        followingCount: 4,
        messages: [
            {
                initials: "AS",
                name: "Anakin Skywalker",
                username: "anakin",
                message: "Primer mensaje",
                repliesCount: 13,
            },
            {
                initials: "AS",
                name: "Anakin Skywalker",
                username: "anakin",
                message: "Segundo mensaje",
                repliesCount: 7,
            },
        ],
        replies: [
            {
                message: "Primera respuesta",
                repliesCount: 0,
            },
        ],
    };

    return (
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
                <div className="rounded-full bg-gray-300 w-20 p-6 font-bold text-lg text-center mb-3">{user.initials}</div>
                <h2>{user.name}</h2>
                <div className="font-semibold text-gray-600 text-lg mb-1">@{params.username}</div>
                <div className="my-3">{user.bio}</div>
                <div className="flex justify-between">
                    <div className="font-semibold">{user.followersCount} Seguidores</div>
                    <div className="font-semibold">{user.followingCount} Siguiendo</div>
                </div>
            </section>
            <UserTab messages={user.messages} replies={[]}></UserTab>
        </main>
    );
};

export default UserPage;
