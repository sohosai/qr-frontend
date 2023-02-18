import { QRCodeList } from "../../lib/QRCode"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import QRListPdf from "."

export default {
  title: 'Components/QRListPdf',
  component: QRListPdf
} as ComponentMeta<typeof QRListPdf>

const Template: ComponentStory<typeof QRListPdf> = (args) => <QRListPdf {...args} />

export const Common = Template.bind({})
Common.args = {
  qrs: QRCodeList
}
