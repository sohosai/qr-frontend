import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import Select from '.'

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => {
  const [text, setText] = useState('')
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setText(event.target.value)
  }

  return (
    <>
      <Select {...args} onChange={onChange} />
      <p>入力結果: {text}</p>
    </>
  )
}

export const Common = Template.bind({})
Common.args = {
  label: '説明',
  initial: '初期値',
  options: ['要素1', '要素2'],
}
