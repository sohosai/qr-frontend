import { ComponentStory, ComponentMeta } from '@storybook/react'
import SpotList from '.'

export default {
  title: 'Components/SpotList',
  component: SpotList,
} as ComponentMeta<typeof SpotList>

const Template: ComponentStory<typeof SpotList> = (args) => <SpotList {...args} />

export const Common = Template.bind({})
Common.args = {
  spot_list: [
    {
      name: 'テスト1',
      area: 'area1',
      building: null,
      floor: null,
      room: null,
    },
    {
      name: 'テスト2',
      area: 'area3',
      building: '3A',
      floor: 2,
      room: '204',
    },
  ],
}
