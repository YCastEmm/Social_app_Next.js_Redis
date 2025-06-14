import UserTab from "@/components/users/UserTabs";
import userApi from "@/services/users/user.service";
import Image from 'next/image'

type UserPageContainerProps = {
    username: string
}

const UserPageContainerAsync = async ({username}: UserPageContainerProps) => { 
 
    
    const userPromise = await userApi.getUserData(username)    
    const userMessagesPromise = await userApi.getUserMessages(username)
    const userRepliesPromise = await userApi.getUserReplies(username)    
    const userFollowersPromise = await userApi.getUserFollowers(username)    
    const userFollowingPromise = await userApi.getUserFollowing(username)    

    const [user, userMessages, userReplies, userFollowers, userFollowing] = await Promise.all([userPromise, userMessagesPromise, userRepliesPromise, userFollowingPromise, userFollowersPromise])

    return (
        <main className="flex flex-col bg-gray-100 pb-8 pt-4 min-h-screen">
    <section className="flex flex-col bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="rounded-full mb-4 w-24 h-24 relative">
            <Image
                className="rounded-full object-cover"
                src={user.photoUrl}
                alt="Imagen de perfil"
                fill
                priority
            />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        <div className="font-semibold text-gray-500 text-sm mb-2">@{user.username}</div>
        <div className="text-gray-700 text-sm mb-4">{user.bio}</div>
        <div className="flex gap-8 text-sm font-semibold text-gray-700">
            <div>{user.followersCount} <span className="font-normal text-gray-500">Seguidores</span></div>
            <div>{user.followingCount} <span className="font-normal text-gray-500">Siguiendo</span></div>
        </div>
    </section>

    <UserTab
        messages={userMessages.content}
        replies={userReplies.content}
        followers={userFollowers.content}
        following={userFollowing.content}
    />
</main>

    );
}


export default UserPageContainerAsync