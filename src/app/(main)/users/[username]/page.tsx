import UserTab from "@/components/users/UserTabs";
import Image from 'next/image'
import avatarImg from '../../../../../public/avatar.webp'

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    
    const {username} = await params
    
    const user = {
        username,
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
                <div className="rounded-full mb-3 block relative w-20 h-20">
                <Image
                    className="rounded-full"
                    src={avatarImg}
                    alt="Imagen de perfil"
                    fill
                    priority
                    placeholder="blur" // Optional blur-up while loading
                    />
                </div>
                <h2>{user.name}</h2>
                <div className="font-semibold text-gray-600 text-lg mb-1">@{username}</div>
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
