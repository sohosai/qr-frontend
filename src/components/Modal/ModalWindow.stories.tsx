import { ComponentStory, ComponentMeta } from "@storybook/react"
import Modal from "."

export default {
  title: 'Components/Modal',
  component: Modal
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => {
  return (
    <div>
      <p>テキストとか書けばいいんじゃないでしょうか</p>
      <Modal {...args}/>
    </div>
  );
};


export const Common = Template.bind({})
Common.args = {
  show: false,
  children: <p>YuseiIto</p>
}
