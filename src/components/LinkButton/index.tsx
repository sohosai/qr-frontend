import { MouseEventHandler } from 'react'
import Button from '@mui/material/Button'

type ButtonProp = {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function LinkButton({ text, onClick }: ButtonProp) {
  return (
    <Button
      variant='outlined'
      size='large'
      sx={{ textTransform: 'none', boxShadow: 3 }}
      className='m-1 h-11 w-36 rounded-md'
      onClick={onClick}
    >
      <span className='center font-bold'>{text}</span>
    </Button>
  )
}
