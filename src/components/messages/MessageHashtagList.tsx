import { TrendingHashtagType } from "@/app/types/hash.types"
import { PageType } from "@/app/types/pagination.types"
import { TrendingUserType } from "@/app/types/user.types"
import exploreApi from "@/services/explore/explore.service"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import UserCard, { UserCardLayout } from "../users/UserCard"
import MessageHashtag from "./MessageHashtag"


type HashtagListProps = {
    initialHashtagPage: PageType<TrendingHashtagType>
}

const MessageHasthtagList = ({initialHashtagPage}: HashtagListProps) => { 


    const [page, setPage] = useState<PageType<TrendingHashtagType>>(initialHashtagPage)
    const [hashtags, setHashtags] = useState<TrendingHashtagType[]>(initialHashtagPage.content)

    const fetchData = async () =>{
        const pageNumber = page.pagination.page + 1
        const response = await  exploreApi.getTrendingHashtags(pageNumber, 10)
        setPage(response)
        setHashtags([...hashtags, ...response.content])
    }

    const refresh = async () =>{
        const response = await  exploreApi.getTrendingHashtags(0, 10)
        setPage(response)
        setHashtags(response.content)
    }

    return (
        <InfiniteScroll
            dataLength={hashtags.length} //This is important field to render the next data
            next={fetchData}
            hasMore={!page.pagination.last}
            loader={<h4>Cargando feed...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Llegaste al final del feed.</b>
                </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8595; Arrastra hacia abajo para refrescar</h3>}
            releaseToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8593; Suelta para refrescar</h3>}
        >
            {hashtags.map((hashtags, index) => (
                <MessageHashtag hash={hashtags} key={`explore-hash-${index}`} />
            ))}
        </InfiniteScroll>
    );



}

export default MessageHasthtagList
