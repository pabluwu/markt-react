import './style.css';
import SampleAvatar from '../../../assets/SampleAvatar.png';
import useStore from '../../../store/userStore';
const Perfil = ({ user, opciones, selectedOption, setSelectedOption }) => {
    const { user: usuarioStore } = useStore();
    return (
        <div className="contenedorPerfil">
            {
                user &&
                usuarioStore &&
                <>
                    <div className="imagenFondo">

                    </div>
                    <div className="opciones">
                        {
                            opciones &&
                            opciones.map((item, index) => (
                                <>
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
                                </>
                            ))
                        }

                        <span className="boton-seguir btn-azul">
                            Seguir
                        </span>

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