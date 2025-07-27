import CharacterCounter from "../ui/CharacterCounter.jsx";

const FeedbackTextArea = ({ formData, onChange, onBlur, errors, touched }) => {
    return (
        <div className="group">
            <label htmlFor="feedback" className="block text-lg mb-2">
                Detailed Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={onChange}
                onBlur={onBlur}
                rows={5}
                placeholder="Tell us more about your experience... What went well? What could be improved?"
                className={`w-full px-4 py-3 bg-[#101010] rounded-xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 placeholder-gray-400 ${
                    errors.feedback && touched.feedback ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-black hover:border-gray-300'
                }`}
            />
            <CharacterCounter
                current={formData.feedback.length}
                min={20}
                touched={touched.feedback}
                error={errors.feedback}
            />
        </div>
    );
};

export default FeedbackTextArea;