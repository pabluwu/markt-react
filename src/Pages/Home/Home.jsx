import { useState } from 'react';
import useStore from '../../store/userStore';
import { getAllPost } from '../../services/usePost';
import Navbar from '../../Components/Navbar/Navbar';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import Publicar from '../../Components/Publicar/Publicar';
import MisEmpresas from '../../Components/MisEmpresas/MisEmpresas';
import Post from '../../Components/Post/Post';
import Noticias from '../../Components/Noticias/Noticias';
import Tab from '../../Components/Tab/Tab';
const Home = () => {
    const [selectedOption, setSelectedOption] = useState({ key: 'posts', nombre: 'Publicaciones', estado: 1 });
    const { user } = useStore();
    const { posts, refetchAllPosts } = getAllPost();
    const opciones = [
        { key: 'posts', nombre: 'Publicaciones', estado: 1 },
        { key: 'news', nombre: 'Noticias', estado: 0 }
    ]
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
                                <Publicar author_id={user.id} type={'user'} refetchPosts={refetchAllPosts} author={user} />

                                <Tab
                                    opciones={opciones}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption} />
                                {
                                    selectedOption.key == 'posts' &&
                                    posts &&
                                    <Post posts={posts} />
                                }
                                {
                                    selectedOption.key == 'news' &&
                                    posts &&
                                    <Noticias/>
                                }
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