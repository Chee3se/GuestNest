import { useState } from 'react';

export default function DateInput({ id, label, defaultValue, minDate, onChange }) {
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
            <input type="date" id={id} name={id} value={value} min={minDate} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
        </div>
    );
}
