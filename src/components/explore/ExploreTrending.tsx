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
        <div className="bg-white rounded-xl shadow p-5 w-full min-w-[240px]">
            <h2 className="mb-3 text-lg font-semibold text-gray-800">Trending</h2>

            {hashes.slice(0, 2).map((hash, index) => (
                <div className="mb-3" key={index}>
                <MessageHashtag hash={hash} />
                </div>
            ))}

            {hashes.length > 2 && (
                <Link href="/explore?type=HASHTAG">
                <div className="text-center link-primary mt-2">Ver más</div>
                </Link>
            )}
        </div>
    );
};

export default ExploreTrending