import { MouseEventHandler } from 'react'

type ButtonProp = {
  disabled: boolean
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ disabled, text, onClick }: ButtonProp) {
  let bgColorClassName = disabled ? 'bg-neutral-300' : 'bg-violet-200'
  let textColorClassName = disabled ? 'text-neutral-500' : 'text-violet-700'
  return (
    <button
      className={`h-8 w-28 rounded-xl ${bgColorClassName}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={`center font-bold ${textColorClassName}`}>{text}</span>
    </button>
  )
}
