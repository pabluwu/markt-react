import useStore from '../../../store/userStore';

import SeguirButton from '../../../Components/SeguirButton/SeguirButton';
import { Briefcase, BadgeCheck, BadgeAlert } from 'lucide-react';

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
                    {/* <div className="opciones">
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

                    </div> */}
                    <div className="container mt-4">
                        <div className="cardUsuario bg-white rounded shadow-sm pt-3">
                            <div className="text-center">

                                <img className='border shadow border-4 border-light rounded-circle'
                                    src={
                                        user.userprofile?.imagen_perfil ?
                                            `${media_url}/${user.userprofile?.imagen_perfil}`
                                            :
                                            SampleAvatar
                                    }
                                    alt="" />

                                <h4><strong>{user.first_name} {user.last_name}</strong></h4>
                                {
                                    user?.cargo_empresa &&
                                    <div className='d-flex justify-content-center align-items-top gap-3 px-4 mt-4'>
                                        <Briefcase size={24} />
                                        <div>
                                            <p className='text-start mb-1'>
                                                <strong>
                                                    {user?.cargo_empresa?.cargo} en {user?.cargo_empresa?.empresa?.nombre_fantasia}
                                                </strong>
                                            </p>
                                            {user?.cargo_empresa?.is_valido ?
                                                <span className='m-0 p-0 d-flex justity-content-center align-items-center gap-1'>
                                                    <BadgeCheck size={12} className='text-success' />
                                                    <p className='text-success m-0' style={{ fontSize: '12px' }}>
                                                        Verificado
                                                    </p>
                                                </span>
                                                :
                                                <span className='m-0 p-0 d-flex justity-content-center align-items-center gap-1'>
                                                    <BadgeAlert size={12} className='text-danger' />
                                                    <p className='text-danger m-0' style={{ fontSize: '12px' }}>
                                                        No verificado
                                                    </p>
                                                </span>
                                            }
                                        </div>

                                    </div>
                                }
                                <div className='mt-4 pb-4'>
                                    <p className='text-center m-0'> <strong>Sobre mí</strong></p>
                                    <p className='px-3 text-center' >{user?.userprofile?.sobre_mi}</p>
                                </div>
                            </div>
                        </div>
                        {
                            usuarioStore.id != user?.id &&
                            <SeguirButton
                                id_seguido={user.id}
                                type_seguido={'user'}
                                id_seguidor={usuarioStore.id}
                                type_seguidor={'user'} />
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Perfil;