import FeedbackForm from './components/form/FeedBackForm.jsx';

export default function FeedbackPage({business_id, rating}) {

    return (
        <div className="min-h-screen py-8 bg-[#020202]">
            <FeedbackForm business_id={business_id} rating={rating}/>
        </div>
    );

}

