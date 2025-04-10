import { hash } from "crypto";
import Link from "next/link";
import PostsCounter from "../counters/PostsCounter";
import { TrendingHashtagType } from "@/app/types/hash.types";


type MessageHashtagProps = {
    hash: TrendingHashtagType
}


const MessageHashtag = ({hash}: MessageHashtagProps) => {
    return (
        <>
            <Link href={`/messages?query=${hash.hash}&type=hash`}>
                <h4 className="font-semibold p-1">{hash.hash}</h4>
            </Link>
            <div className="px-1">
                <PostsCounter count={hash.count} />
            </div>
        </>
    );
};

export default MessageHashtag;
