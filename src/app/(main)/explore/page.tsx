import exploreApi from "@/services/explore/explore.service";
import ExploreTabs from "@/components/explore/ExploreTabs";



const ExplorePage = async ({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) => {
    
    const params = await searchParams;

    const hashesPromise = exploreApi.getTrendingHashtags(0, 20)
    const usersPromise = exploreApi.getFollowRecommendations(0, 20)

    const [hashes, users ] = await Promise.all([hashesPromise, usersPromise])


    return (
        <main className="flex flex-col bg-gray-100 pt-8">
            <section className="flex flex-col mb-8">
                <ExploreTabs
                    hashtags={hashes}
                    users={users}
                    initialTab={params?.type} />
            </section>
        </main>
        
    );
};

export default ExplorePage;
