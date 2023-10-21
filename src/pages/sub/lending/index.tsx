'use client'

import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box, Stack, Button, Grid } from '@mui/material'
import Header from '@/components/Header'
import Lending from '@/pages/lending'
import LendingListShow from '@/pages/lending/list'
import FixturesSearch from '@/pages/items/search'
import LinkButton from '@/components/LinkButton'

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

export default function LendingPage() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Header />
      <h1 className='p-10 text-center text-3xl'>物品管理アプリケーション</h1>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Stack spacing={2} direction='row'>
          <LinkButton
            text={'貸出 / 返却'}
            onClick={() => {
              window.location.href = '/sub/lending'
            }}
          />
          <LinkButton
            text={'登録'}
            onClick={() => {
              window.location.href = '/sub/register'
            }}
          />
        </Stack>
      </Grid>
      <Box sx={{ width: '100%', height: '50px' }}></Box>
      <Box sx={{ width: '100%', maxWidth: 'lg', m: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='top tabs'>
            <Tab label='貸し出し' {...a11yProps(0)} />
            <Tab label='返却' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Lending />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          返却のコンポーネントが入る予定
        </CustomTabPanel>
      </Box>
    </>
  )
}
