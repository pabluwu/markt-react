import { useState } from "react";

import Navbar from "../../Components/Navbar/Navbar";
import SelectorDocumentos from "./Components/SelectorDocumentos";
import SelectedDocuments from "./Components/SelectedDocuments";
import ChatIA from "./Components/ChatIA";

const Comparador = () => {
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    const onRemove = (idToRemove) => {
        setSelectedDocuments(prevItems => prevItems.filter(item => item.id !== idToRemove));
    }
    return (
        <>
            <Navbar />
            <div className="container-fluid mt-4 p-4">
                <h2 className="fw-bold">Comparador de Documentos</h2>
                <p>Carga y compara documentos con la ayuda de inteligencia artificial</p>
                <div className="row">
                    <SelectorDocumentos
                        selectedDocuments={selectedDocuments}
                        setSelectedDocuments={setSelectedDocuments} />
                    {selectedDocuments.length > 0 &&
                        <div className="col-md-8">
                            <SelectedDocuments
                                documents={selectedDocuments}
                                onRemove={onRemove} />
                            <ChatIA recursosIds={selectedDocuments.map(item => item.id)}/>
                        </div>
                    }
                </div>
            </div>
        </>
    )
};

export default Comparador;