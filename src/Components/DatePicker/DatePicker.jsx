import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { es } from 'date-fns/locale'

const DatePickerCustom = ({ label, name, control, errors, required }) => {

    return (

        <div className="form-group d-flex flex-column mt-4">
            <label>{label}</label>
            <Controller
                name={name}
                rules={required}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        className="date-input form-control w-100"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        onClick={(e) => e.target.blur()}
                        locale={es}
                        dateFormat="dd/MM/yyyy"
                    />
                )}
            />
            {errors[name]?.type === 'required' && <p className="error_input">Campo requerido</p>}
        </div>
    );
};

export default DatePickerCustom;
