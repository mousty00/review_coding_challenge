const CharacterCounter = ({ current, min, touched, error }) => {
    return (
        <div className="flex justify-between mt-2 text-sm">
            <span className="text-red-500 font-medium">{touched && error}</span>
            <span className={`font-medium ${current >= min ? 'text-green-600' : 'text-gray-500'}`}>
                {current}/{min} min
            </span>
        </div>
    );
};

export default CharacterCounter;