import PostItem from "./PostItem";

const Post = ({ posts }) => {
    // console.log(posts);
    return (
        <>
            {
                posts && posts.length > 0 ? (
                    posts.map(item => (
                        <PostItem
                            key={item.id}
                            item={item}
                        />
                    ))
                ) : (
                    <p className="text-center">No hay publicaciones disponibles.</p>
                )
            }
        </>
    )
}

export default Post;