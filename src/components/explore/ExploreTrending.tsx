import Link from "next/link";
import PostsCounter from "../counters/PostsCounter";
import { TrendingHashtagType } from "@/types/hash.types";
import MessageHashtag from "../messages/MessageHashtag";


type ExploreTrendingProps = {
    hashes: TrendingHashtagType[]
}


const ExploreTrending = ({hashes} : ExploreTrendingProps) => {
    if (!hashes || hashes.length === 0 ) {
        return <></>
    }

    return (
        <div className="bg-gray-200 rounded-lg px-5 py-3" style={{minWidth: 240}}>
            <h2 className="mb-2">Trending</h2>
            {hashes.slice(0,2).map((hash, index) => (
                <div className="mb-2" key={index}>
                    <MessageHashtag hash={hash}></MessageHashtag>
                </div>
            ))}
            {hashes.length > 2 && 
                <Link href={"/explore?type=HASHTAG"}>
                    <div className="text-center link-primary">
                        Ver más
                    </div>
                </Link>
            }
        </div>
    );
};

export default ExploreTrending