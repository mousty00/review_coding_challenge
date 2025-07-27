import {ButtonProps} from "../../../types.js";

export default function Button({text, icon, onClick, type = "default", className}: ButtonProps) {

    const handleStyle = () => {
        switch (type) {
            case "success":
                return "bg-gray-300 text-green-600"
            case "danger":
                return "bg-gray-300 text-red-600"
            case "default":
                return "bg-indigo-500 text-white"
        }
    }

    return (
        <>
            <button className={`${handleStyle()} ${className}`} onClick={onClick}>
                <span>{text}</span>
                {icon && icon}
            </button>
        </>
    )
}