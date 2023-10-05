import { ComponentStory, ComponentMeta } from '@storybook/react'
import LendingList from '.'

export default {
  title: 'Components/LendingList',
  component: LendingList,
} as ComponentMeta<typeof LendingList>

const Template: ComponentStory<typeof LendingList> = (args) => <LendingList {...args} />

export const Common = Template.bind({})
const now = new Date()
Common.args = {
  lending_list: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      fixtures_id: '650e8400-e29b-41d4-a716-446655440000',
      fixtures_qr_id: 'x345',
      lending_at: now,
      returned_at: null,
      spot_name: '場所1',
      borrower_name: 'user1 name',
      borrower_number: 202212000,
      borrwer_org: null,
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      fixtures_id: '650e8400-e29b-41d4-a716-446655440001',
      fixtures_qr_id: 'x346',
      lending_at: now,
      returned_at: null,
      spot_name: '場所2',
      borrower_name: 'user2 name',
      borrower_number: 202212000,
      borrwer_org: 'jsys',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      fixtures_id: '650e8400-e29b-41d4-a716-446655440000',
      fixtures_qr_id: 'x346',
      lending_at: now,
      returned_at: null,
      spot_name: '場所3',
      borrower_name: 'user3 name',
      borrower_number: 202212002,
      borrwer_org: null,
    },
  ],
}
