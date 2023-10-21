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
      className='
        m-2
        h-11
        w-40
        rounded-md
        '
      onClick={onClick}
    >
      <span className='center font-bold'>{text}</span>
    </Button>
  )
}
