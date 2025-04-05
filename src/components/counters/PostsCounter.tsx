type PostsCounterProp = {
    count: number
}


const PostsCounter = ({count}: PostsCounterProp) => {

    const label = count > 1 ? "posteos" : "posteo"

    return (
        <>
            <div>
                <div>
                    <h4></h4>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default PostsCounter