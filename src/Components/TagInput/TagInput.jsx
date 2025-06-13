import { useState } from "react";
import { Controller } from "react-hook-form";
const TagInput = ({ control, name, errors }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e, onChange) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/,+$/, ""); // eliminar coma final
      if (newTag && !tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        onChange(updatedTags.join(",")); // pasar string al hook form
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      const updatedTags = tags.slice(0, -1);
      setTags(updatedTags);
      onChange(updatedTags.join(","));
    }
  };

  const removeTag = (index, onChange) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onChange(updatedTags.join(","));
  };

  return (
    <Controller
      name={name}
      control={control}
      // rules={{ required: "El contenido es obligatorio" }}
      defaultValue=""
      render={({ field: { onChange } }) => (
        <div className={` form-control border rounded p-2 d-flex flex-wrap gap-2 ${errors.palabrasClaves ? 'is-invalid' : ''}`}>
          {tags.map((tag, index) => (
            <div
              key={index}
              className="badge bg-success text-white d-flex align-items-center px-2 py-1"
            >
              <span>{tag}</span>
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                aria-label="Eliminar"
                onClick={() => removeTag(index, onChange)}
                style={{ fontSize: "0.6rem" }}
              />
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, onChange)}
            className={` form-control border-0 flex-grow-1 ${errors.palabrasClaves ? 'is-invalid' : ''}`}
            placeholder="Escribe una palabra y presiona coma"
            style={{ minWidth: "120px", boxShadow: "none" }}
          />
        </div>
      )}
    />
  )
}

export default TagInput;