import { ComponentStory, ComponentMeta } from '@storybook/react'
import SystemButton from '.'

export default {
  title: 'Components/Button',
  component: SystemButton,
} as ComponentMeta<typeof SystemButton>

const Template: ComponentStory<typeof SystemButton> = (args) => <SystemButton {...args} />

export const Common = Template.bind({})
Common.args = {
  disabled: true,
  text: '登録',
  onClick: () => {
    console.log('clicked!')
  },
}
