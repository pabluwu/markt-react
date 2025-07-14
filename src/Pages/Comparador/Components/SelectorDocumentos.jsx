import { useState } from "react";
import {
    Plus,
    HardDrive,
    ArrowUpFromLine
} from "lucide-react";
import { useRecursosInfinite } from "../../../services/useRecursosUsuarios";
import useStore from "../../../store/userStore";

import Tab from "../../../Components/Tab/Tab";
import CardDocumento from "../../PublicHome/components/CardDocumento";
import FileUploadDropzone from "./FileUploadZoneDrop";

const SelectorDocumentos = ({selectedDocuments, setSelectedDocuments}) => {
    const [selectedOption, setSelectedOption] = useState({ key: 'existentes', nombre: 'Existentes', icon: <HardDrive size={18} /> });

    const opciones = [
        { key: 'existentes', nombre: 'Existentes', icon: <HardDrive size={18} /> },
        { key: 'subir', nombre: 'Subir', icon: <ArrowUpFromLine size={18} /> },
    ]

    const { user } = useStore();

    const {
        recursos,
        fetchNextRecursos,
        hasMoreRecursos,
        isFetchingNextRecursos,
        isLoadingRecursos,
        isErrorRecursos,
        errorRecursos,
        refetchAllRecursos
    } = useRecursosInfinite({
        autoLoadAll: true,
        authorId: user?.id,
        authorType: "user",
    });

    const agregarDocumento = (item) => {
        console.log(item);
        if(!selectedDocuments.includes(item)){
            setSelectedDocuments(prevItems => [...prevItems, item]);
        }
    }

    console.log(selectedDocuments);
    return (
        <div className="col-md-4 bg-white rounded-sm shadow-sm p-4">
            <div className="d-flex align-items-center gap-2">
                <Plus size={16} className="fw-bold" />
                <h4 className="fw-bold m-0">Agregar documentos</h4>
            </div>
            <Tab
                opciones={opciones}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            {
                selectedOption.key === 'existentes' &&
                recursos.map(item => (
                    <div
                        key={item.id}
                        className={'cursor-pointer'}
                        onClick={() => agregarDocumento(item)}>
                        <CardDocumento selected={selectedDocuments.includes(item) ? true: false} documento={item} />
                    </div>
                ))
            }
            {
                selectedOption.key === 'subir' &&
                (
                    <FileUploadDropzone customSubmit={() => { console.log('hola') }} />
                )
            }
        </div>
    )
}

export default SelectorDocumentos;