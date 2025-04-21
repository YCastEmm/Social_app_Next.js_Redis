import UserPageContainerAsync from "@/components/users/UserPageContainerAsync";


const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    
    const {username} = await params
    
    return <UserPageContainerAsync username={username} />
}
export default UserPage;
