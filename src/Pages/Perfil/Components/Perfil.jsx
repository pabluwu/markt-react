import useStore from '../../../store/userStore';

import SeguirButton from '../../../Components/SeguirButton/SeguirButton';

import SampleAvatar from '../../../assets/SampleAvatar.png';
import './style.css';
const Perfil = ({ user, opciones, selectedOption, setSelectedOption }) => {
    const { user: usuarioStore } = useStore();
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
                        <div className="cardUsuario">
                            <div className="text-center">
                                <img src={SampleAvatar} alt="" />
                                <h2>{user.first_name} {user.last_name}</h2>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Perfil;