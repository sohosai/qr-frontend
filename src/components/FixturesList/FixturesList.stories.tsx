import { ComponentStory, ComponentMeta } from '@storybook/react'
import FixturesList from '.'

export default {
  title: 'Components/FixturesList',
  component: FixturesList,
} as ComponentMeta<typeof FixturesList>

const Template: ComponentStory<typeof FixturesList> = (args) => <FixturesList {...args} />

export const Common = Template.bind({})
Common.args = {
  fixtures_list: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      qr_id: 'x345',
      qr_color: 'red',
      name: 'test',
      description: 'test用のダミー',
      note: '',
      parent_id: 'xxxx',
      model_number: null,
      storage: 'room101',
      usage: null,
      usage_season: null,
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      qr_id: 'x346',
      qr_color: 'red',
      name: 'LANケーブル100m',
      description: 'test用のダミー',
      note: '',
      parent_id: 'xxxx',
      model_number: null,
      storage: 'room101',
      usage: null,
      usage_season: null,
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      qr_id: 'x347',
      qr_color: 'blue',
      name: 'Blackmagick Design Convert HDMI 適当なクソながタイトルをこうやってどしどしと錬成していくんじゃ',
      description: 'test用のダミー',
      note: '',
      parent_id: 'xxxx',
      model_number: null,
      storage: 'room101',
      usage: null,
      usage_season: null,
    },
  ],
}
