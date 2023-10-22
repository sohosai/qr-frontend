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
import { Box, Stack, Grid } from '@mui/material'
import Header from '@/components/Header'
import LinkButton from '@/components/LinkButton'
import SearchPage from '@/pages/sub/search'
import RegisterPage from '@/pages/sub/register'
import LendingPage from '@/pages/sub/lending'

// type TabPanelProps = {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { value, index, ...other } = props

//   return (
//     <div
//       role='tabpanel'
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     ></div>
//   )
// }

// function a11yProps(index: number) {
//   return {
//     id: `tab-${index}`,
//     'aria-controls': `tabpanel-${index}`,
//   }
// }

export default function Page() {
  // const [value, setValue] = React.useState(0)
  const [flag, setFlag] = React.useState(0)

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue)
  // }

  return (
    <>
      <Header />
      <h1 className='p-10 text-center text-3xl'>物品管理アプリケーション</h1>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Stack spacing={2} direction='row'>
          <LinkButton text={'貸出 / 返却'} onClick={() => setFlag(1)} />
          <LinkButton text={'登録'} onClick={() => setFlag(2)} />
        </Stack>
      </Grid>
      <Box sx={{ width: '100%', height: '50px' }}></Box>
      {flag == 0 ? <SearchPage /> : null}
      {flag == 1 ? <RegisterPage /> : null}
      {flag == 2 ? <LendingPage /> : null}
    </>
  )
}
