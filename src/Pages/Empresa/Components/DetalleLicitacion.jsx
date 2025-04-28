import Popup from "../../../Components/Popup/Popup";
import useFormattedDate from "../../../services/useFormattedDate";
import OfertasLicitacion from "./OfertasLicitacion";

const DetalleLicitacion = ({ show, setShow, licitacion, setSelectedOption }) => {
    console.log(licitacion);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="modal-title" id="exampleModalLabel">Detalle de licitacion</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => {
                        setShow(!show);
                        setSelectedOption({ key: 'mis-licitaciones', nombre: 'Mis Licitaciones' });
                    }}></span>
            </div>

            <div className="mt-5">
                <div className="row">
                    <div className="col-6">
                        <p><strong>Titulo: </strong>{licitacion?.titulo}</p>
                    </div>
                    <div className="col-6">
                        <p><strong>Descripción: </strong>{licitacion?.descripcion}</p>
                    </div>
                    <div className="col-6">
                        <p><strong>Fecha de inicio: </strong>{useFormattedDate(licitacion?.fecha_inicio)}</p>
                    </div>
                    <div className="col-12">
                        <p><strong>Fecha de termino:</strong> {useFormattedDate(licitacion?.fecha_fin)}</p>
                    </div>

                </div>
            </div>
            <OfertasLicitacion licitacion_id={licitacion.id} />
        </>
    )
}

export default DetalleLicitacion;