import PostItem from "./PostItem";
import { getAllPost } from "../../services/usePost";
const Post = ({posts}) => {
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