export default function FileInput({ id, name, className, onChange }) {
    return (
        <input
            id={id}
            type="file"
            name={name}
            className={className}
            onChange={onChange}
        />
    );
}
