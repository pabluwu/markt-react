import useStore from '../../store/userStore';
import { getAllPost } from '../../services/usePost';
import Navbar from '../../Components/Navbar/Navbar';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import Publicar from '../../Components/Publicar/Publicar';
import MisEmpresas from '../../Components/MisEmpresas/MisEmpresas';
import Post from '../../Components/Post/Post';
const Home = () => {
    const { user } = useStore();
    const { posts, refetchAllPosts } = getAllPost();
    return (
        <>
            {
                user &&
                <>
                    <Navbar />
                    <div className="container mt-4">
                        <div className="row ">
                            <div className="col-lg-3 mb-2">
                                <ProfileCard user={user} />
                            </div>
                            <div className="col-lg-6 mb-2">
                                <Publicar author_id={user.id} type={'user'} refetchPosts={refetchAllPosts}/>
                                <Post posts={posts} />
                            </div>
                            <div className="col-lg-3 mb-2">
                                <MisEmpresas />
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Home;