import InputField from "../ui/InputField.jsx";

const ContactInformation = ({ formData, onChange, onBlur, errors, touched }) => {
    return (
        <div className="space-y-8 mt-8">
            <h3 className="text-xl text-gray-500 mb-4">Contact Information (Optional)</h3>

            <InputField
                id="customer_name"
                name="customer_name"
                label="Customer Name"
                placeholder="John Doe"
                value={formData.customer_name}
                onChange={onChange}
                icon="👤"
            />

            <div className="grid md:grid-cols-2 gap-6">
                <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.email}
                    touched={touched.email}
                    icon="📧"
                />

                <InputField
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.phone}
                    touched={touched.phone}
                    icon="📱"
                />
            </div>
        </div>
    );
};

export default ContactInformation;