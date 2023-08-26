import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import TextArea from '.'

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [text, setText] = useState('')
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <>
      <TextArea {...args} text={text} onChange={onChange} />
      <p>入力結果: {text}</p>
    </>
  )
}

export const Common = Template.bind({})
Common.args = {
  label: '説明',
  placeholder: '赤色ケース・緑色パッチシール貼り付け済み',
}
