import './style.css';
import SampleAvatar from '../../../assets/SampleAvatar.png';
const Perfil = ({ user, opciones, selectedOption, setSelectedOption }) => {
    console.log(selectedOption);
    return (
        <div className="contenedorPerfil">
            {
                user &&
                <>
                    <div className="imagenFondo">

                    </div>
                    <div className="opciones">
                        {
                            opciones &&
                            opciones.map((item,index) => (
                                <p
                                    key={index}
                                    className={selectedOption.key == item.key ? 'active' : ''}
                                    onClick={() => setSelectedOption({key: item.key, nombre: item.nombre})}>
                                    {item.nombre}
                                </p>
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