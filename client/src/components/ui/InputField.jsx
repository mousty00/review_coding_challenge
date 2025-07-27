const InputField = ({
    id,
    name,
    type = "text",
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    required = false,
    icon = "",
    rows = null
}) => {
    const getInputClasses = () => {
        const baseClasses = "w-full px-4 py-3 bg-[#101010] rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400";
        const hasError = error && touched;
        return `${baseClasses} ${hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-500 hover:border-gray-300'}`;
    };

    const InputComponent = type === 'textarea' ? 'textarea' : 'input';

    return (
        <div className="group">
            <label htmlFor={id} className="block text-lg mb-2">
                {icon} {label} {required && <span className="text-red-500">*</span>}
            </label>
            <InputComponent
                id={id}
                name={name}
                type={type !== 'textarea' ? type : undefined}
                rows={rows}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={getInputClasses()}
            />
            {touched && error && (
                <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
            )}
        </div>
    );
};

export default InputField;