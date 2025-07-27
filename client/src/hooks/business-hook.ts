import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchBusinesses = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // @ts-ignore
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/businesses");
                setData(response.data);
            } catch (err) {
                console.error("Error fetching businesses:", err);
                setError("Failed to fetch businesses.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, error, loading };
};

export const useBusinessExists = (business_id) => {
    const [businessExists, setBusinessExists] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // @ts-ignore
    const checkBusinessExists = async () => {
        if (!business_id) {
            setBusinessExists(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:3000/api/businesses/${business_id}/exists`);
            setBusinessExists(response.data);
        } catch (err) {
            setError(err.message);
            setBusinessExists(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkBusinessExists();
    }, [business_id]);

    return {
        businessExists,
        loading,
        error,
        refetch: checkBusinessExists
    };
};
