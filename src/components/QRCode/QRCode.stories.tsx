import { ComponentStory, ComponentMeta } from '@storybook/react'
import QRCode from '.'

export default {
  title: 'Components/QRCode',
  component: QRCode,
} as ComponentMeta<typeof QRCode>

const Template: ComponentStory<typeof QRCode> = (args) => <QRCode {...args} />

export const Common = Template.bind({})
Common.args = {
  uuid: 'c7d091a4-6d6b-49c3-8125-62ad9b59fd4b',
}
