import { ComponentStory, ComponentMeta } from "@storybook/react"
import Button from "."

export default {
    title: 'Components/Button',
    component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Common = Template.bind({})
Common.args = {
    disabled: true,
    text: "登録",
    onClick: () => {
        console.log('clicked!')
    },
}