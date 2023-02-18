import { QRCodeList } from "../../lib/QRCode"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import QRCode from "."

export default {
  title: 'Components/QRCode',
  component: QRCode
} as ComponentMeta<typeof QRCode>

const Template: ComponentStory<typeof QRCode> = (args) => <QRCode {...args} />

export const Red = Template.bind({})
Red.args = {
  qr: QRCodeList[0]
}

export const Blue = Template.bind({})
Blue.args = {
  qr: QRCodeList[1]
}

export const Green = Template.bind({})
Green.args = {
  qr: QRCodeList[2]
}

export const Orange = Template.bind({})
Orange.args = {
  qr: QRCodeList[3]
}

export const Pink = Template.bind({})
Pink.args = {
  qr: QRCodeList[4]
}

export const Purple = Template.bind({})
Purple.args = {
  qr: QRCodeList[5]
}

export const Cyan = Template.bind({})
Cyan.args = {
  qr: QRCodeList[6]
}

export const Yellow = Template.bind({})
Yellow.args = {
  qr: QRCodeList[7]
}

export const Brown = Template.bind({})
Brown.args = {
  qr: QRCodeList[8]
}

export const LightGreen = Template.bind({})
LightGreen.args = {
  qr: QRCodeList[9]
}