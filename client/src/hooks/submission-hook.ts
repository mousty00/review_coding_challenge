import { Submission } from "../../types";
import { usePostRequest } from "./api";

export const useAddSubmission = () => {
    return usePostRequest<Submission>("http://localhost:3000/api/submissions/create");
};
