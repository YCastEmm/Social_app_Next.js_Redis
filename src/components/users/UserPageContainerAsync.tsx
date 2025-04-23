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
    
    const [user, userMessages, userReplies] = await Promise.all([userPromise, userMessagesPromise, userRepliesPromise])

    return (
        <main className="flex flex-col bg-gray-100 p-8">
            <section className="flex flex-col mb-8">
                <div className="rounded-full mb-3 block relative w-20 h-20">
                <Image
                    className="rounded-full"
                    src={user.photoUrl}
                    alt="Imagen de perfil"
                    fill
                    priority
                    />
                </div>
                <h2>{user.name}</h2>
                <div className="font-semibold text-gray-600 text-lg mb-1">@{user.username}</div>
                <div className="my-3">{user.bio}</div>
                <div className="flex justify-between">
                    <div className="font-semibold">{user.followersCount} Seguidores</div>
                    <div className="font-semibold">{user.followingCount} Siguiendo</div>
                </div>
            </section>
            <UserTab messages={userMessages.content} replies={userReplies.content}></UserTab>
        </main>
    );
}


export default UserPageContainerAsync