// export const api = 'http://localhost:8000/api/' //dev
// export const media_url = 'http://localhost:8000/' // dev
export const media_url = 'https://markt.cl/' // produccion
export const api = 'https://markt.cl/api/' //produccionn

export const formas_pago_choices = [
    { id: 1, value: 'TRANSFERENCIA', label: "Transferencia" },
    { id: 5, value: 'CREDITO', label: "Crédito 30-60-90 días" },
    { id: 6, value: 'WEBPAY', label: "Webpay" },
    { id: 7, value: 'CRIPTO', label: "Criptomonedas u otras" },
];

export const modalidades_choices = [
    { value: 'PRESENCIAL', label: "Presencial" },
    { value: 'REMOTO', label: "Remoto / Online" },
    { value: 'TERRENO', label: "En terreno / Despacho incluido" },
];