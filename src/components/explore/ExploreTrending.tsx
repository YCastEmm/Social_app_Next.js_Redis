import Link from "next/link";
import PostsCounter from "../counters/PostsCounter";
import { Hashtag } from "@/app/types/hash.types";


type ExploreTrendingProps = {
    hashes: Hashtag[]
}


const ExploreTrending = ({hashes} : ExploreTrendingProps) => {
    if (!hashes || hashes.length === 0 ) {
        return <></>
    }

    return (
        <div className="bg-gray-100 rounded-lg px-5 py-3" style={{minWidth: 240}}>
            <h2 className="mb-2">Trending</h2>
            {hashes.slice(0,2).map((hash, index) => (
                <div className="mb-2" key={index}>
                    <Link href="/messages?query=Tatooine&type=hash">
                        <h4 className="font-semibold p-1">#{hash.hash}</h4>
                    </Link>
                    <div className="px-1">
                        <PostsCounter count={hash.count} />
                    </div>
                </div>
            ))}
            {hashes.length > 2 && 
                <Link href={"/explore?type=hash"}>
                    <div className="text-center link-primary">
                        Ver más
                    </div>
                </Link>
            }
        </div>
    );
};

export default ExploreTrending