import { Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

const FileUploadDropzone = ({ customSubmit }) => {
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const file = watch('archivo');

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setValue('archivo', droppedFile);
      setSelectedFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleClick = () => inputRef.current?.click();

  const handleCancel = () => {
    reset();
    setSelectedFile(null);
  };

  const onSubmit = (data) => {
    if (customSubmit) {
      customSubmit(data);
    } else {
      console.log('Archivo enviado:', data.archivo);
    }
    reset();
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="border border-dashed rounded p-5 text-center"
        style={{ borderColor: '#d3d3d3', cursor: 'pointer' }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <Upload size={40} strokeWidth={1.5} className="text-muted mb-3" />
        <h5 className="fw-bold">Subir nuevo documento</h5>
        <p className="text-muted mb-4">
          Arrastra y suelta tu archivo aquí o haz clic para seleccionar
        </p>

        {!selectedFile ? (
          <button type="button" onClick={handleClick} className="btn btn-dark mb-3">
            Seleccionar archivo
          </button>
        ) : (
          <div className="d-flex flex-column align-items-center gap-2 mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="text-truncate" style={{ maxWidth: 200 }}>{selectedFile.name}</span>
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleCancel}>
                <X size={16} />
              </button>
            </div>
            <button type="submit" className="btn btn-success">Enviar</button>
          </div>
        )}

        <input
          {...register('archivo')}
          ref={(e) => {
            register('archivo').ref(e);
            inputRef.current = e;
          }}
          onChange={handleFileSelect}
          type="file"
          accept=".pdf,.doc,.docx"
          className="d-none"
        />
        <p className="text-muted small mb-0">Formatos soportados: PDF, DOC, DOCX</p>
      </div>
    </form>
  );
};

export default FileUploadDropzone;
