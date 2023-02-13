import { MouseEventHandler } from "react"

type ButtonProp = {
    disabled: boolean,
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button ({ disabled, text, onClick }: ButtonProp ) {
    return(
        disabled ? (
            <button className="w-24 h-8 bg-neutral-300 rounded-lg">
                <span className="font-bold text-neutral-500 center">{text}</span>
            </button>
        ) : (
            <button className="w-24 h-8 bg-white rounded-lg" onClick={onClick}>
                <span className="font-bold text-orange-600 center">{text}</span>
            </button>
        )
    );
}
