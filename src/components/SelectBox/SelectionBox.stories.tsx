import { ComponentStory, ComponentMeta } from "@storybook/react"
import SelectionBox from "."

export default {
    title: 'Components/SelectionBox',
    component: SelectionBox
} as ComponentMeta<typeof SelectionBox>

const Template: ComponentStory<typeof SelectionBox> = (args) => {
    return (
      <div>
        <SelectionBox {...args}/>
      </div>
    );
  };

export const Common = Template.bind({})
  Common.args = {
    options: ['Option 1', 'Option 2', 'Option 3'],
  }