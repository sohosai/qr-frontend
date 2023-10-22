'use client'

import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import LendingListShow from '@/pages/lending/list'
import FixturesSearch from '@/pages/items/search'

type TabPanelProps = {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    ></div>
  )
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  }
}

export default function SearchPage() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 'lg', m: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='top tabs'>
            <Tab label='物品検索' {...a11yProps(0)} />
            <Tab label='貸出中一覧' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <FixturesSearch />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <LendingListShow />
        </CustomTabPanel>
      </Box>
    </>
  )
}
