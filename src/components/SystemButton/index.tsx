import { MouseEventHandler } from 'react'
import Button from '@mui/material/Button'

type ButtonProp = {
  disabled: boolean
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function SystemButton({ disabled, text, onClick }: ButtonProp) {
  let bgColorClassName = disabled ? 'bg-neutral-300' : 'bg-violet-200'
  let textColorClassName = disabled ? 'text-neutral-500' : 'text-violet-700'
  return (
    <Button
      variant='outlined'
      size='large'
      sx={{ textTransform: 'none', boxShadow: 3 }}
      className={`m-1 h-11 w-36 rounded-md ${bgColorClassName}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={`center font-bold ${textColorClassName}`}>{text}</span>
    </Button>
  )
}
