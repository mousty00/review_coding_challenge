import axios from "axios";
import {useState} from "react";

export const usePostRequest = <TData, TResponse = any>(endpoint: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // @ts-ignore
    const post = async (data: TData): Promise<TResponse | null> => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            await axios.post<TResponse>(endpoint, data);
            setSuccess(true);
        } catch (err: any) {
            console.error(`POST ${endpoint} failed:`, err);

            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || err.message);
            } else {
                setError("Unexpected error occurred");
            }

            setSuccess(false);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { post, loading, success, error };
};
