import {Key} from "react";
import {JSX} from "react/jsx-runtime";

export interface Business {
    name: string,
    industry: string,
    img_url: string,
    gmb_url: string,
}

export interface BusinessCardProps {
    item: Business,
    key: Key
}

export interface ButtonProps {
    text: string,
    onClick: () => void,
    icon?: JSX.Element,
    type?: "success" | "danger" | "default",
    className?: string
}

export interface Interaction {
    business_id: string,
    rating: number
}

export interface Submission {
    business_id: string,
    rating: number,
    feedback: string,
    category: "Service" | "Food Quality" | "Wait Time" | "Staff" | "Cleanliness" | "Other",
    customer_name: string,
    email: string,
    phone?: number
}