import StarRating from "./StarRating.jsx";

const FormHeader = ({ rating }) => {
    return (
        <div className="text-center mb-8 ">
            <h1 className="sm:text-4xl text-xl font-semibold mb-2">
                Share Your Experience
            </h1>
            <p className="text-gray-600">We value your feedback to improve our service</p>
            <StarRating rating={rating} />
        </div>
    );
};

export default FormHeader;