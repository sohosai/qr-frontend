import { ComponentStory } from '@storybook/react'
import { useState } from 'react'
import QRCodeReader from '.'

export default {
  title: 'Components/QRCodeReader',
  component: QRCodeReader,
}

const Template: ComponentStory<typeof QRCodeReader> = (args) => {
  const [text, setText] = useState('')
  return (
    <>
      <QRCodeReader onReadCode={setText} validate={(str) => str !== ''} />
      <p>結果: {text}</p>
    </>
  )
}

export const Common = Template.bind({})
