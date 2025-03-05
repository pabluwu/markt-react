import useStore from '../../store/userStore';
import Navbar from '../../Components/Navbar/Navbar';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import Publicar from '../../Components/Publicar/Publicar';
import MisEmpresas from '../../Components/MisEmpresas/MisEmpresas';
const Home = () => {

    const { user } = useStore();
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row ">
                    <div className="col-lg-3 mb-2">
                        <ProfileCard user={user} />
                    </div>
                    <div className="col-lg-6 mb-2">
                        <Publicar />
                    </div>
                    <div className="col-lg-3 mb-2">
                        <MisEmpresas />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;