export default function Header({businessName = null}) {
    return (
        <header className="flex flex-col items-center justify-center gap-4 pb-4 mb-8 w-full">
            {businessName ?
                (
                    <>
                        <h3 className="text-3xl font-semibold">Review {businessName}</h3>
                        <p className="text-gray-500 text-center mt-4">
                            Help us improve by rating your experience.
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="text-3xl font-semibold">Reviews</h3>
                        <p className="text-gray-500 max-w-sm text-center mt-4">
                            Help us improve by rating your experience with the businesses below.
                        </p>
                    </>
                )}

        </header>
    )
}