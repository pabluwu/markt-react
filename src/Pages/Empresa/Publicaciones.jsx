import { getAllPostByEmpresa } from "../../services/usePost";
import Publicar from "../../Components/Publicar/Publicar";
import Post from "../../Components/Post/Post";

const PublicacionesEmpresa = ({ empresa }) => {
    const { postsEmpresa, refetchPosts } = getAllPostByEmpresa(empresa.id);
    console.log(postsEmpresa);
    return (
        <>
            <Publicar author_id={empresa.id} type={'empresa'} refetchPosts={refetchPosts} author={empresa}/>
            <Post posts={postsEmpresa} />
        </>
    )
}

export default PublicacionesEmpresa;