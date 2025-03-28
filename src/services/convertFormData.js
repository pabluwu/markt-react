export const convertToFormData = (data) => {
    const formData = new FormData();

    // Función recursiva para agregar campos al FormData
    const appendFormData = (data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof File)) {
            Object.keys(data).forEach((key) => {
                const newKey = parentKey ? `${parentKey}[${key}]` : key;
                appendFormData(data[key], newKey); // Llamada recursiva
            });
        } else {
            formData.append(parentKey, data); // Agregar campo al FormData
        }
    };

    appendFormData(data); // Iniciar el proceso
    return formData;
};