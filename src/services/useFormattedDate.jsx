import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const useFormattedDate = (dateString) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        if (dateString) {
            const date = new Date(dateString);
            const formatted = format(date, 'dd/MM/yyyy HH:mm'); // Formato DD/MM/YYYY HH:mm
            setFormattedDate(formatted);
        }
    }, [dateString]);

    return formattedDate;
};

export default useFormattedDate;
