import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

const TagInput = ({ control, name, errors }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags]         = useState([]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""                     // ya viene de useForm.defaultValues
      render={({ field: { value, onChange } }) => {
        // cuando cambie el valor (solo al montar o si defaultValues cambian),
        // partimos el string para poblar las tags:
        useEffect(() => {
          if (typeof value === "string" && value.length) {
            const inicialTags = value.split(",").map(t => t.trim()).filter(Boolean);
            setTags(inicialTags);
          }
        }, [value]);

        const handleKeyDown = e => {
          if ((e.key === "," || e.key === "Enter") && tags.length < 5) {
            e.preventDefault();
            const nueva = inputValue.trim().replace(/,+$/, "");
            if (nueva && !tags.includes(nueva)) {
              const updated = [...tags, nueva];
              setTags(updated);
              onChange(updated.join(","));
              setInputValue("");
            }
          } else if (e.key === "Backspace" && inputValue === "") {
            const updated = tags.slice(0, -1);
            setTags(updated);
            onChange(updated.join(","));
          } else if ((e.key === "," || e.key === "Enter") && tags.length >= 5) {
            e.preventDefault(); // No permitir más de 5 tags
          }
        };

        const removeTag = idx => {
          const updated = tags.filter((_, i) => i !== idx);
          setTags(updated);
          onChange(updated.join(","));
        };

        return (
          <div className={`form-control border rounded p-2 d-flex flex-wrap gap-2 ${errors[name] ? 'is-invalid' : ''}`}>
            {tags.map((t, i) => (
              <div key={i} className="badge bg-success text-white px-2 py-1 d-flex align-items-center">
                <span>{t}</span>
                <button
                  type="button"
                  className="btn-close btn-close-white btn-sm ms-2"
                  aria-label="Eliminar"
                  onClick={() => removeTag(i)}
                  style={{ fontSize: "0.6rem" }}
                />
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`form-control border-0 flex-grow-1 ${errors[name] ? 'is-invalid' : ''}`}
              placeholder="Escribe una palabra y presiona coma"
              style={{ minWidth: "120px", boxShadow: "none" }}
              disabled={tags.length >= 5}
            />
          </div>
        );
      }}
    />
  );
};

export default TagInput;
