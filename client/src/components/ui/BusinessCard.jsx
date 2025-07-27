import Rating from "./Rating.jsx";

export default function BusinessCard({item, rating, setRating}) {
    return (
        <div className="flex max-md:flex-col bg-[#101010]/50 gap-6 items-center rounded-lg shadow hover:shadow-md transition-shadow p-6 w-full">
            <img
                src={item.img_url}
                className="aspect-square object-cover rounded-2xl w-40"
                alt={item.name + " image"}
            />
            <div className="place-items-center mx-auto space-y-6">
                <h3 className="text-xl text-white">{item.name}</h3>
                {/* Star Rating component */}
                <Rating
                    item={item}
                    rating={rating}
                    setRating={setRating}
                />
            </div>
        </div>
    );
}