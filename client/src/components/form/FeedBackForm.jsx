import Swal from "sweetalert2";
import React, { useState, useEffect } from 'react';
import FormHeader from "../ui/FormHeader.jsx";
import FeedbackTextArea from "./FeedbackTextArea.jsx";
import CategorySelect from "./CategorySelect.jsx";
import ContactInformation from "./ContactInformation.jsx";
import SubmitButton from "../ui/SubmitButton.jsx";
import SuccessScreen from "../screens/SuccessScreen.jsx";
import { useNavigate } from "react-router-dom";
import { useAddSubmission } from "../../hooks/submission-hook";

const FeedbackForm = ({ business_id, rating }) => {
    const [formData, setFormData] = useState({
        business_id: business_id,
        rating: rating,
        feedback: '',
        category: '',
        customer_name: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // I use this custom API hook to manage the submissions
    const { post: submitFeedback, loading, success: apiSuccess, error: apiError } = useAddSubmission();

    const categories = [
        { value: '', label: 'Select a category' },
        { value: 'service', label: '🛎️ Service' },
        { value: 'food_quality', label: '🍽️ Food Quality' },
        { value: 'wait_time', label: '⏰ Wait Time' },
        { value: 'staff', label: '👥 Staff' },
        { value: 'cleanliness', label: '✨ Cleanliness' },
        { value: 'other', label: '💭 Other' }
    ];

    useEffect(() => {
        if (apiSuccess) {
            setSuccess(true);
            setFormData({
                business_id: business_id,
                rating: rating,
                feedback: '',
                category: '',
                customer_name: '',
                email: '',
                phone: ''
            });
            setTouched({});
        }
    }, [apiSuccess, business_id, rating]);

    useEffect(() => {
        if (apiError) {
            Swal.fire({
                text: apiError,
                icon: "error",
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true,
            });
        }
    }, [apiError]);

    const validateField = (name, value) => {
        switch (name) {
            case 'feedback':
                if (!value.trim()) {
                    return 'Detailed feedback is required';
                }
                if (value.trim().length < 20) {
                    return 'Feedback must be at least 20 characters long';
                }
                return '';

            case 'category':
                if (!value) {
                    return 'Please select an issue category';
                }
                return '';

            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address';
                }
                return '';

            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                    return 'Please enter a valid phone number';
                }
                return '';

            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};

        newErrors.feedback = validateField('feedback', formData.feedback);
        newErrors.category = validateField('category', formData.category);

        if (formData.email) {
            newErrors.email = validateField('email', formData.email);
        }
        if (formData.phone) {
            newErrors.phone = validateField('phone', formData.phone);
        }

        Object.keys(newErrors).forEach(key => {
            if (!newErrors[key]) {
                delete newErrors[key];
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        const fieldError = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: fieldError
        }));
    };

    const handleSubmit = async () => {
        setTouched({
            feedback: true,
            category: true,
            email: !!formData.email,
            phone: !!formData.phone
        });

        if (validateForm()) {
            await submitFeedback(formData);
        }
    };

    const resetForm = () => {
        setSuccess(false);
        setFormData({
            business_id: business_id,
            rating: rating,
            feedback: '',
            category: '',
            customer_name: '',
            email: '',
            phone: ''
        });
        setTouched({});
        setErrors({});
    };

    const handleGoHome = () => {
        window.location.reload();
    };

    if (success) {
        return <SuccessScreen onReset={resetForm} onGoHome={handleGoHome} />;
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-lg mx-auto">
                <FormHeader rating={rating} />

                <div className="rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <div className="space-y-6">
                            <FeedbackTextArea
                                formData={formData}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                            />

                            <CategorySelect
                                formData={formData}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                                categories={categories}
                            />

                            <ContactInformation
                                formData={formData}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                errors={errors}
                                touched={touched}
                            />

                            <SubmitButton loading={loading} onSubmit={handleSubmit} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;