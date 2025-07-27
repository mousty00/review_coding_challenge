import './App.css';
import {useFetchBusinesses} from "./hooks/business-hook.ts";
import BusinessCard from "./components/ui/BusinessCard.jsx";
import Header from "./components/ui/Header.jsx";
import {redirect, useLocation, useNavigate} from "react-router-dom";
import FeedbackPage from "./FeedbackPage.jsx";
import {useState} from "react";
import Swal from "sweetalert2";

function ReviewPage() {
    const { data, error, loading } = useFetchBusinesses();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const business = queryParams.get('business');
    const navigate = useNavigate()
    const [ratings, setRatings] = useState({});

    const currentRating = business ? ratings[business] : null;

    // Function to set rating for specific business
    const setRatingForBusiness = (businessId, rating) => {
        setRatings(prev => ({
            ...prev,
            [businessId]: rating
        }));
    };

    // Check for any low rating <= 3 regardless of query param
    const lowRatedBusinessId = Object.keys(ratings).find(
        id => parseInt(ratings[id]) <= 3
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020202]">
                <p className="text-gray-500 text-center">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020202]">
                <p className="text-red-500 text-center">{error}</p>
            </div>
        );
    }

    // If any rating is ≤ 3, show FeedbackPage for that business
    if (lowRatedBusinessId) {
        return (
            <FeedbackPage
                business_id={lowRatedBusinessId}
                rating={parseInt(ratings[lowRatedBusinessId])}
            />
        );
    }

    if (business) {
        const foundBusiness = data.find(item => item.id === business);

        if (foundBusiness) {
            if (parseInt(currentRating) <= 3) {
                return (
                    <FeedbackPage
                        business_id={business}
                        rating={parseInt(currentRating)}
                    />
                );
            }

            return (
                <div className="min-h-screen max-w-xl space-y-6 bg-[#020202] flex flex-col items-center p-4">
                    <Header businessName={foundBusiness.name} />
                    <BusinessCard
                        item={foundBusiness}
                        rating={currentRating}
                        setRating={(rating) => setRatingForBusiness(business, rating)}
                    />
                </div>
            );
        } else {
             Swal.fire({
                title: "Error",
                icon: "error",
                text: "business not found.",
                showConfirmButton: false,
                timer: 2000
            }).then(
                navigate("/review")
             );
        }
    }

    // 📋 Render all businesses if no low rating & no specific business selected
    return (
        <div className="min-h-screen flex flex-col bg-[#020202]">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
                {data.map((item) => (
                    <BusinessCard
                        key={item.id}
                        item={item}
                        rating={ratings[item.id] || null}
                        setRating={(rating) => setRatingForBusiness(item.id, rating)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ReviewPage;
