import { PageType } from "@/app/types/pagination.types";
import { httpGet, httpGetPublic } from "../common/http.service";
import { TrendingHashtagType } from "@/app/types/hash.types";
import { TrendingUserType } from "@/app/types/user.types";



class ExploreApi {

    // Devuelve una promesa con una página de hashtags (content: TrendingHashtagType[])
    getTrendingHashtags = async ( page: number, size: number) : Promise<PageType<TrendingHashtagType>> => {
        return httpGetPublic(`/explore/trending`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    }  
    
    // Devuelve una promesa con una página de usuarios sugeridos (content: TrendingUserType[])
    getFollowRecommendations = async ( page: number, size: number) : Promise<PageType<TrendingUserType>> => {
        return httpGetPublic(`/explore/follow-recommendations`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    }
}


const exploreApi = new ExploreApi();

export default exploreApi