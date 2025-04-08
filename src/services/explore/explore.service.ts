import { PageType } from "@/app/types/pagination.types";
import { httpGet, httpGetPublic } from "../common/http.service";
import { HashtagType } from "@/app/types/hash.types";



class ExploreApi {

    getTrendingHashtags = async ( page: number, size: number) : Promise<PageType<HashtagType>> => {
        return httpGetPublic(`/explore/trending`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    }  
    
    getFollowRecommendations = async ( page: number, size: number) : Promise<PageType<HashtagType>> => {
        return httpGetPublic(`/explore/follow-recommendations`, new URLSearchParams({page: `${page}`, size: `${size}`}))
    }
}


const exploreApi = new ExploreApi();

export default exploreApi