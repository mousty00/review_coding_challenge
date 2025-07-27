import {Interaction} from "../../types";
import {usePostRequest} from "./api";

export const useAddInteraction = () => {
    return usePostRequest<Interaction>("http://localhost:3000/api/interactions/create");
};
