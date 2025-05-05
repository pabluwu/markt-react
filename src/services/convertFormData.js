export const convertToFormData = (data) => {
    const formData = new FormData();

    const appendFormData = (value, key) => {
        if (value === null || value === undefined) return;

        if (key === "usuarios" && Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
        // } else if (key === "productos" && Array.isArray(value)) {
        //     formData.append('productos', JSON.stringify(value)); // ✅ Cambiado a JSON.stringify
        } else if (value instanceof File) {
            formData.append(key, value); // ✅ Agregar archivos sin índice
        } else if (typeof value === "object") {
            Object.keys(value).forEach((subKey) => {
                appendFormData(value[subKey], key); // ❌ Aquí se estaba agregando con [subKey], lo eliminamos
            });
        } else {
            formData.append(key, value);
        }
    };

    Object.keys(data).forEach((key) => appendFormData(data[key], key));
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    return formData;
};
