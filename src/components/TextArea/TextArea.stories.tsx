import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import TextArea from "."

export default {
  title: 'xxx',
  component: TextArea
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [text, setText] = useState("")
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }
  return (
    <>
      <TextArea {...args} value={text} onChange={onChange} />
      <p>入力結果: { text }</p>
    </>
  )
}

export const Common = Template.bind({})
Common.args = {
  label: 'xxx',
  placeholder: 'xxx'
}
