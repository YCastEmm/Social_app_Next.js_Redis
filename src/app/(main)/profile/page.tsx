import UserPageContainerAsync from "@/components/users/UserPageContainerAsync";
import userApi from "@/services/users/user.service";





const ProfilePage = async () => {
    
    const me = await userApi.getMe()
    
    return <UserPageContainerAsync username={me.username} />
}
export default UserPage;
