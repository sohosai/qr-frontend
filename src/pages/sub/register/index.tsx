'use client'

import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Box, Stack, Button, Grid } from '@mui/material'
import Header from '@/components/Header'
import Lending from '@/pages/lending'
import LendingListShow from '@/pages/lending/list'
import FixturesSearch from '@/pages/items/search'
import FixturesRegister from '@/pages/items/register'
import SpotFixturesRegister from '@/pages/spot/register'
import SpotListShow from '@/pages/spot/list'
import Printing from '@/pages/printing'
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

export default function RegisterPage() {
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
            <Tab label='物品登録' {...a11yProps(0)} />
            <Tab label='地点情報の登録' {...a11yProps(1)} />
            <Tab label='地点情報の一覧' {...a11yProps(2)} />
            <Tab label='印刷' {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <FixturesRegister />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SpotFixturesRegister />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SpotListShow />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Printing />
        </CustomTabPanel>
      </Box>
    </>
  )
}
