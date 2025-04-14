import './style.css';
import SampleAvatar from '../../assets/SampleAvatar.png';
import { media_url } from '../../assets/variables';
import { renderFormattedDate } from '../../services/useFormattedDate';
const ContactCard = ({ solicitud }) => {
    console.log(solicitud);
    return (
        <div className="contact-card w-100 border-box-shadow mt-3 px-3 py-3">

            <div className="d-flex gap-4">
                <a className='d-flex gap-4' href={`/p/${solicitud.username}`}>
                    <img className='rounded profile-img'
                        src={
                            solicitud.imagen_perfil ?
                                `${media_url}/${solicitud.imagen_perfil}`
                                :
                                SampleAvatar
                        }
                        alt="" />
                    <div className='flex-row'>
                        <p className='m-0'><strong>{solicitud.username}</strong></p>
                        <span>
                            <p>Conectados desde {renderFormattedDate(solicitud.fecha_seguimiento)}</p>
                        </span>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default ContactCard;