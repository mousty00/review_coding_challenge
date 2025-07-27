const CategorySelect = ({ formData, onChange, onBlur, errors, touched, categories }) => {
    const getInputClasses = () => {
        const baseClasses = "w-full px-4 py-3 bg-[#101010] rounded-xl focus:outline-none  transition-all duration-200 placeholder-gray-400";
        const hasError = errors.category && touched.category;
        return `${baseClasses} ${hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'hover:border-gray-300'}`;
    };

    return (
        <div className="group">
            <label htmlFor="category" className="block text-lg mb-2">
                Issue Category <span className="text-red-500">*</span>
            </label>
            <select
                id="category"
                name="category"
                value={formData.category}
                onChange={onChange}
                onBlur={onBlur}
                className={getInputClasses()}
            >
                {categories.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            {touched.category && errors.category && (
                <p className="text-red-500 text-sm mt-2 font-medium">{errors.category}</p>
            )}
        </div>
    );
};

export default CategorySelect;