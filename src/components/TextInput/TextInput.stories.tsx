import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import TextInput from '.'

export default {
  title: 'Components/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => {
  const [text, setText] = useState('')
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }
  return (
    <>
      <TextInput {...args} value={text} onChange={onChange} />
      <p>入力結果: {text}</p>
    </>
  )
}

export const Common = Template.bind({})
Common.args = {
  label: '物品名',
  required: false,
  placeholder: 'LANケーブル 100m',
}
