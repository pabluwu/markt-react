import { Link } from 'react-router-dom';
import SampleAvatar from '../../assets/SampleAvatar.png';
const ProfileCard = ({ user }) => {
    return (
        <div className="rounded profile-card py-3">
            <Link to={`/p/${user.username}`}>
                <div className="info-profile px-3">
                    <img className='rounded'
                        src={
                            user.userprofile.imagen_perfil ?
                                `${'http://localhost:8000'}/${user.userprofile.imagen_perfil}`
                                :
                                SampleAvatar
                        } alt="" />
                    <div>
                        <h4>{`${user?.first_name} ${user?.last_name}`}</h4>
                        <p>Descripcion</p>
                    </div>
                </div>
            </Link>
            <p className="sub-info-profile px-3 pt-3">
                {
                    user?.userprofile?.sobre_mi
                }
            </p>
        </div>
    )
}

export default ProfileCard;