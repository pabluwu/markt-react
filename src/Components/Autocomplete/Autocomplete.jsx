import React, { useState, useEffect, useRef } from 'react';
import { useController, useWatch } from 'react-hook-form';

const AutocompleteInput = ({
    name,
    control,
    options,
    searchKey,
    valueKey,
    placeholder = '',
    rules = {},
    label
}) => {
    const { field } = useController({ name, control, rules });
    const fieldValue = useWatch({ control, name }); // Watch for external changes

    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const matched = options.find((opt) => opt[valueKey] === fieldValue);
        setInputValue(matched ? matched[searchKey] : '');
    }, [fieldValue, options, searchKey, valueKey]);

    useEffect(() => {
        if (inputValue.trim() === '') {
            setFilteredOptions([]);
            return;
        }

        const filtered = options.filter((item) =>
            item[searchKey].toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [inputValue, options, searchKey]);

    const handleSelect = (item) => {
        setInputValue(item[searchKey]);
        field.onChange(item[valueKey]);
        setShowDropdown(false);
    };

    const handleBlur = () => {
        const matched = options.find(
            (item) => item[searchKey].toLowerCase() === inputValue.toLowerCase()
        );

        if (!matched) {
            setInputValue('');
            field.onChange('');
        } else {
            field.onChange(matched[valueKey]);
            setInputValue(matched[searchKey]);
        }

        setTimeout(() => setShowDropdown(false), 100);
    };

    const handleFocus = () => {
        if (filteredOptions.length > 0) {
            setShowDropdown(true);
        }
    };

    return (
        <div className="position-relative mt-4" ref={dropdownRef}>
            <label htmlFor="">
                {label}
            </label>
            <input
                type="text"
                className="form-control"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                }}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                autoComplete="off"
            />
            {showDropdown && filteredOptions.length > 0 && (
                <ul className="list-group position-absolute w-100 z-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {filteredOptions.map((item) => (
                        <li
                            key={item[valueKey]}
                            className="list-group-item list-group-item-action"
                            onMouseDown={() => handleSelect(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item[searchKey]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteInput;
