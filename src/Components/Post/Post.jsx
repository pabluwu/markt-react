import PostItem from "./PostItem";
import { getAllPost } from "../../services/usePost";
const Post = () => {
    const { posts } = getAllPost();
    console.log(posts);
    return (
        <>
            {
                posts &&
                posts.map(item => (
                    <PostItem
                        key={item.id}
                        item={item} />
                ))
            }
        </>
    )
}

export default Post;