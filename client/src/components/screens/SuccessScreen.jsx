import {FaCheckCircle} from "react-icons/fa";

const SuccessScreen = ({onReset, onGoHome}) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg mx-auto rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <h2 className="text-2xl font-bold">
                            Thank You!
                        </h2>
                        <FaCheckCircle size={28}/>
                    </div>

                    <p className="text-gray-200 mb-8 leading-relaxed">
                        Your feedback has been submitted successfully. We appreciate your input and will use it to
                        improve our service.
                    </p>
                    <div className="space-y-3">
                        {/*<button*/}
                        {/*    onClick={onReset}*/}
                        {/*    className="w-full py-3 px-6 flex justify-center bg-indigo-800 font-semibold rounded-xl hover:bg-indigo-600 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 transform hover:scale-105"*/}
                        {/*>*/}
                        {/*    Submit Another Feedback*/}
                        {/*</button>*/}
                        <button
                            onClick={onGoHome}
                            className="w-full py-3 px-6 flex justify-center bg-indigo-800 font-semibold rounded-xl hover:bg-indigo-600  focus:ring-4 focus:ring-gray-500/20 transition-all duration-200"
                        >
                            <p>Go Back Home</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessScreen;