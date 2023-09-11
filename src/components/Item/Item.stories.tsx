import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import Item from '.'

export default {
  title: 'Components/Item',
  component: Item,
} as ComponentMeta<typeof Item>

const Template: ComponentStory<typeof Item> = (args) => {
  return (
    <>
      <Item {...args} />
    </>
  )
}

export const Common = Template.bind({})
Common.args = {
  label: '項目名',
  value: 'LANケーブル 100m',
}
