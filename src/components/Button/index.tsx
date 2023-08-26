import { MouseEventHandler } from "react"

type ButtonProp = {
    disabled: boolean,
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button ({ disabled, text, onClick }: ButtonProp ) {
    let bgColorClassName = disabled ? "bg-neutral-300" : "bg-white"
    let textColorClassName = disabled ? "text-neutral-500" : "text-orange-600" 
    return(
        <button
            className={`w-24 h-8 rounded-xl ${bgColorClassName}`}
            disabled={disabled}
            onClick={onClick}
        >
            <span className={`font-bold center ${textColorClassName}`}>
                {text}
            </span>
        </button>
    );
}
