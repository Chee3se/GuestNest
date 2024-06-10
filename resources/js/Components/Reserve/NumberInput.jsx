import { useState } from 'react';

export default function NumberInput({ id, label, defaultValue, min, max, onChange }) {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-100">{label}</label>
            <input type="number" id={id} name={id} value={value} onChange={handleChange} min={min} max={max} className="mt-1 p-2 w-full border rounded-md" required />
        </div>
    );
}
