import useStore from '../../../store/userStore';

import SeguirButton from '../../../Components/SeguirButton/SeguirButton';

import { api, media_url } from '../../../assets/variables';
import SampleAvatar from '../../../assets/SampleAvatar.png';
import './style.css';
const Perfil = ({ user, opciones, selectedOption, setSelectedOption }) => {
    const { user: usuarioStore } = useStore();
    console.log(usuarioStore);
    return (
        <div className="contenedorPerfil">
            {
                usuarioStore &&
                user &&
                <>
                    <div className="imagenFondo">

                    </div>
                    <div className="opciones">
                        {
                            opciones &&
                            opciones.map((item, index) => (
                                <div key={index}>
                                    {
                                        item.key == 'configurar' &&
                                        usuarioStore.id === user?.id &&
                                        <p
                                            key={index}
                                            className={selectedOption.key == item.key ? 'active' : ''}
                                            onClick={() => setSelectedOption({ key: item.key, nombre: item.nombre })}>
                                            {item.nombre}
                                        </p>
                                    }
                                    {
                                        item.key != 'configurar' &&
                                        <p
                                            key={index}
                                            className={selectedOption.key == item.key ? 'active' : ''}
                                            onClick={() => setSelectedOption({ key: item.key, nombre: item.nombre })}>
                                            {item.nombre}
                                        </p>
                                    }
                                </div>
                            ))
                        }

                        {
                            usuarioStore.id != user?.id &&
                            <SeguirButton
                                id_seguido={user.id}
                                type_seguido={'user'}
                                id_seguidor={usuarioStore.id}
                                type_seguidor={'user'} />
                        }

                    </div>
                    <div className="container">
                        <div className="cardUsuario pt-3">
                            <div className="text-center">
                                <img className='rounded'
                                    src={
                                        user.userprofile?.imagen_perfil ?
                                            `${media_url}/${user.userprofile?.imagen_perfil}`
                                            :
                                            SampleAvatar
                                    }
                                    alt="" />
                                <h2>{user.first_name} {user.last_name}</h2>
                                {
                                    user?.cargo_empresa &&
                                    <>
                                        <hr />
                                        <p>{user?.cargo_empresa?.cargo} en {user?.cargo_empresa?.empresa?.nombre_fantasia} { user?.cargo_empresa?.is_valido ? '✅' : '❗'}</p>
                                        <hr />
                                    </>
                                }
                                <p className='px-3'>{user?.userprofile?.sobre_mi}</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Perfil;