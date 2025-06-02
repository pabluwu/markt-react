import { Users, Eye, Briefcase, Award } from "lucide-react";
const CardReputacion = ({ servicios, licitaciones, colaboradores, seguidores }) => {

    const reputacion = [
        { id: 1, nombre: 'Colaboradores', icon: Users },
        { id: 2, nombre: 'Seguidores', icon: Eye },
        { id: 3, nombre: 'Servicios', icon: Briefcase },
        { id: 4, nombre: 'Licitaciones', icon: Award },
    ]
    return (
        <>
            <div className="row">
                {
                    reputacion.map(item => (
                        <div className="col-lg-3" key={item.id}>
                            <div className="box-datos border py-3 rounded d-flex flex-column justify-content-center align-items-center gap-2">
                                <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', backgroundColor: '#f3f4f6' }}>
                                    <item.icon size={24} className="text-dark" />
                                </div>
                                <h4>
                                    <strong>
                                        {

                                            item.nombre == 'Servicios' ?
                                                servicios > 0 ?
                                                    servicios : 0
                                                :
                                                ''
                                        }
                                        {
                                            item.nombre == 'Licitaciones' ?
                                                licitaciones > 0 ?
                                                    licitaciones : 0
                                                :
                                                ''
                                        }
                                        {
                                            item.nombre == 'Colaboradores' ?
                                                colaboradores > 0 ?
                                                    colaboradores : 0
                                                :
                                                ''
                                        }
                                        {
                                            item.nombre == 'Seguidores' ?
                                                seguidores > 0 ?
                                                    seguidores : 0
                                                :
                                                ''
                                        }
                                    </strong>
                                </h4>
                                <p className="text-muted m-0">
                                    <strong>
                                        {item.nombre}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}
export default CardReputacion;