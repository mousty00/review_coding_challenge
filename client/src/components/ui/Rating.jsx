import {FaRegStar, FaStar} from "react-icons/fa";
import {useAddInteraction} from "../../hooks/interaction-hook.ts";
import Swal from 'sweetalert2'

export default function Rating({item, rating, setRating}) {
    const {post: submitInteraction, loading, success, error} = useAddInteraction();

    async function handleRatingState(index) {
        const ratingValue = index + 1;

        const business_id = item.id
        const interaction = {
            business_id,
            rating: ratingValue,
        };


        try {
            await submitInteraction(interaction);
            if (ratingValue > 3) {
                await Swal.fire({
                    title: "Thank You!",
                    text: "Thanks for your positive rating!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });

                // Update the rating state to show the selection
                if (setRating) {
                    setRating(ratingValue);
                }
            } else if (ratingValue <= 3) {
                if (setRating) {
                    setRating(ratingValue);
                    // small delay to ensure state update is processed
                    setTimeout(() => {
                    }, 100);
                }
            }
        } catch (err) {
            await Swal.fire({
                title: "Error",
                icon: "error",
                text: "Failed to submit rating. Please try again.",
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    const selectedRate = rating ? rating - 1 : null;

    return (
        <div className="flex flex-col gap-8 items-center">
            <ul className="flex gap-2 items-center">
                {[0, 1, 2, 3, 4].map((index) => (
                    <li key={index} className="cursor-pointer" onClick={() => handleRatingState(index)}>
                        {selectedRate !== null && index <= selectedRate ? (
                            <FaStar size={22} className="text-violet-500"/>
                        ) : (
                            <FaRegStar size={22} className="text-white"/>
                        )}
                    </li>
                ))}
                <li>
                    <p className="text-lg text-white">{rating}</p>
                </li>
            </ul>
            {loading && <p className="text-gray-500">Submitting rating...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}