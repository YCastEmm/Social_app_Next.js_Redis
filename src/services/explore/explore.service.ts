import { PageType } from "@/types/pagination.types";
import { TrendingHashtagType } from "@/types/hash.types";
import { TrendingUserType } from "@/types/user.types";
import httpInternalApi from "../common/http.internal.service";



class ExploreApi {

    // Devuelve una promesa con una página de hashtags (content: TrendingHashtagType[])
    getTrendingHashtags = async ( page: number, size: number) : Promise<PageType<TrendingHashtagType>> => {
        return httpInternalApi.httpGetPublic(`/explore/trending`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    }  
    
    // Devuelve una promesa con una página de usuarios sugeridos (content: TrendingUserType[])
    getFollowRecommendations = async ( page: number, size: number) : Promise<PageType<TrendingUserType>> => {
        return httpInternalApi.httpGetPublic(`/explore/follow-recommendations`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    }
}


const exploreApi = new ExploreApi();

export default exploreApi