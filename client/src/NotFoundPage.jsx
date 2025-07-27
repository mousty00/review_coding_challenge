import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {MdError, MdHome, MdArrowBack} from 'react-icons/md';

export default function NotFoundPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // this line get the error from location state if it exists
    const error = location.state?.error;
    const errorMessage = location.state?.errorMessage;

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="rounded-2xl shadow-xl p-8 space-y-6">
                    {/* 404 Icon */}
                    <div className="flex justify-center">
                        <MdError className="w-12 h-12 text-red-500"/>
                    </div>

                    {/* Error Content */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">404</h1>
                        <h2 className="text-xl font-semibold text-gray-200">Page Not Found</h2>

                        {error ? (
                            <div className="border rounded-lg p-4">
                                <p className="text-sm text-red-600 font-medium">Error Details:</p>
                                <p className="text-sm text-red-700 mt-1">
                                    {errorMessage || error.message || 'An unexpected error occurred'}
                                </p>
                                {error.status && (
                                    <p className="text-xs text-red-500 mt-2">
                                        Status Code: {error.status}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-200">
                                The page you're looking for doesn't exist or has been moved.
                            </p>
                        )}

                        {/* Current Path Display */}
                        <div className="bg-[#101010] rounded-lg p-3">
                            <p className="text-xs text-gray-200 uppercase tracking-wide">Requested Path</p>
                            <p className="text-sm text-gray-500 font-mono break-all">
                                {location.pathname}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3">
                        <button
                            onClick={handleGoHome}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <MdHome/>
                            <span>Go Home</span>
                        </button>

                        <button
                            onClick={handleGoBack}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <MdArrowBack className="w-5 h-5"/>
                            <span>Go Back</span>
                        </button>
                    </div>

                    {/* Help Text */}
                    <div className="text-xs text-gray-400 space-y-1">
                        <p>If you believe this is a mistake, please contact support.</p>
                        <p>Error ID: {Date.now().toString(36).toUpperCase()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}