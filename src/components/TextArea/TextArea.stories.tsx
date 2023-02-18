import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import TextArea from "."

export default {
  title: 'Components/TextArea',
  component: TextArea
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = (args) => {
  const [text, setText] = useState("")

  return (
    <>
      <TextArea {...args} text={text} onChange={setText} />
      <p>入力結果: { text }</p>
    </>
  )
}

export const Common = Template.bind({})
Common.args = {
  label: '説明',
  placeholder: '赤色ケース・緑色パッチシール貼り付け済み'
}
