import { useState } from 'react';
import Popup from '../Popup/Popup';
import Tiptap from '../TipTap/TipTap';
import SampleAvatar from '../../assets/SampleAvatar.png';
const Publicar = () => {
    const [popUpCompartir, setPopupCompartir] = useState(false);
    const [publishContent, setPublishContent] = useState(false);

    const contentCompartir = (
        <>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Compartir publicación</h5>
                <span className="btn-close cursor-pointer"
                    onClick={() => setPopupCompartir(!popUpCompartir)}></span>
            </div>
            <div className="modal-body">
                <div className="tiptap">
                    <Tiptap onContentChange={setPublishContent}/>
                </div>
            </div>
            <div className="modal-footer">
                <span className="btn btn-secondary" onClick={() => setPopupCompartir(false)}>Cancelar</span>
                <span className="btn btn-azul" onClick={() => console.log(publishContent)}>Publicar</span>
            </div>
        </>
    )

    return (
        <>
            <Popup children={contentCompartir} show={popUpCompartir} setShow={setPopupCompartir} />
            <div className="rounded profile-card py-3">
                <div className="info-profile px-3">
                    <img src={SampleAvatar} alt="" />
                    <div className='compartir rounded-pill'
                        onClick={() => setPopupCompartir(true)}>
                        <p>Publica algo</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Publicar;