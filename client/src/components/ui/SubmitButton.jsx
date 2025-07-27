const SubmitButton = ({ loading, onSubmit }) => {
    return (
        <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="bg-indigo-800 w-full flex flex-col items-center justify-center"
        >
            {loading ? (
                <p>Submitting Your Feedback...</p>
            ) : (
                <p className="text-center">Submit Feedback</p>
            )}
        </button>
    );
};

export default SubmitButton;