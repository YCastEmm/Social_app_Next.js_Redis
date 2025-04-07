type PostsCounterProp = {
    count: number
}


const PostsCounter = ({count}: PostsCounterProp) => {

    const label = count > 1 ? "posteos" : "posteo"

    return (
        <>
            <div>
                {count} {label}
            </div>
        </>
    );
};

export default PostsCounter