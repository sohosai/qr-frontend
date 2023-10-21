// import React, { useState, useEffect } from 'react'
// import Header from '@/components/Header'
// import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
// import IconButton from '@mui/material/IconButton'
// import QrCodeReader from '@/components/QRCodeReader'
// import { useRouter } from 'next/router'

// /**
//  * QRにログインした際に最初に表示されるトップページ
//  * 各ページに飛べるようにボタンを配置する
//  */
// export default function Home() {
//   const router = useRouter()
//   const [qrId, setQrId] = useState('')
//   const onChangeQrId = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     setQrId(event.target.value)
//   }
//   const [isOpenQrReader, setIsOpenQrReader] = useState(false)

//   useEffect(() => {
//     if (qrId !== '') {
//       router.replace(`/items/${qrId}`)
//     }
//   }, [qrId])

//   return (
//     <>
//       <Header />
//       <div
//         style={{
//           fontSize: '21px',
//           fontWeight: 'bold',
//           margin: '21px',
//         }}
//       >
//         物品管理アプリケーション
//       </div>
//       {isOpenQrReader ? (
//         <QrCodeReader
//           f={(qr_id) => {
//             setQrId(qr_id)
//           }}
//         />
//       ) : (
//         <></>
//       )}
//       <IconButton
//         size='large'
//         background-color='#6600CC'
//         sx={{
//           color: '#6600CC',
//           border: '1px solid #6600CC',
//           boxShadow: '1px 1px 5px 1px  #998fa3',
//           textAlign: 'cetner',
//         }}
//         onClick={() => {
//           setIsOpenQrReader(!isOpenQrReader)
//         }}
//       >
//         <QrCodeScannerIcon fontSize='inherit' />
//       </IconButton>
//     </>
//   )
// }

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

export default function Page() {
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
            <Tab label='物品検索' {...a11yProps(0)} />
            <Tab label='貸し出し中一覧' {...a11yProps(1)} />
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
