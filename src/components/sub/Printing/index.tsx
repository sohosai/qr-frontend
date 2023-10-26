'use client'

import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import FixturesRegister from '@/pages/items/register'
import SpotFixturesRegister from '@/pages/spot/register'
import SpotListShow from '@/pages/spot/list'
import Printing from '@/pages/printing'

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

export default function RegisterItemPage() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 'lg', m: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='top tabs'>
            <Tab label='物品登録' {...a11yProps(0)} />
            <Tab label='QRコード生成 / 印刷' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <FixturesRegister />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Printing />
        </CustomTabPanel>
      </Box>
    </>
  )
}
