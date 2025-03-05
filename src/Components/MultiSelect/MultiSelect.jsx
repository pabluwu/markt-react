import Select from 'react-select';
import { Controller } from 'react-hook-form';
import makeAnimated from 'react-select/animated';

const MultiSelect = ({ control, name, options, rules, label, errors }) => {
    const animatedComponents = makeAnimated();
    console.log(options, 'opciones para el componente');
    return (
        <div className='mt-4'>
            <label htmlFor="">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select
                        {...field}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={options}
                        onChange={(selectedOptions) => {
                            console.log(selectedOptions);
                            field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : []);
                        }}
                        onBlur={field.onBlur} 
                        value={options.filter(option => field.value?.includes(option.value))}
                    />
                )}
            />
            {errors[name]?.type === 'required' && <p className="error_input">Campo requerido</p>}
        </div>
    );
}

export default MultiSelect;