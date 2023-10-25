'use client'

import React from 'react'
import { Box, Stack, Grid, IconButton } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search'
import RoomIcon from '@mui/icons-material/Room'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import QrCodeIcon from '@mui/icons-material/QrCode'

export default function Top() {
  const router = useRouter()

  return (
    <>
      <div className='block p-10 text-center text-3xl'>
        <span className='inline-block'>物品管理</span>
        <span className='inline-block'>アプリケーション</span>
      </div>
      <Box sx={{ width: '100%', height: '50px' }}></Box>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Stack spacing={2} direction='row'>
          <IconButton
            aria-label='search'
            color='info'
            sx={{
              border: '1px solid #0288d1',
              boxShadow: '1px 1px 5px 1px  #998fa3',
            }}
            onClick={() => router.push('/')}
          >
            <SearchIcon fontSize='inherit' className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14' />
          </IconButton>
          <IconButton
            aria-label='checkout-return'
            color='info'
            sx={{
              border: '1px solid #0288d1',
              boxShadow: '1px 1px 5px 1px  #998fa3',
            }}
            onClick={() => router.push('/checkout-return')}
          >
            <QrCodeIcon fontSize='inherit' className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14' />
          </IconButton>
          <IconButton
            aria-label='regisration'
            color='info'
            sx={{
              border: '1px solid #0288d1',
              boxShadow: '1px 1px 5px 1px  #998fa3',
            }}
            onClick={() => router.push('/register-item')}
          >
            <AppRegistrationIcon
              fontSize='inherit'
              className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14'
            />
          </IconButton>
          <IconButton
            aria-label='spot'
            color='info'
            sx={{
              border: '1px solid #0288d1',
              boxShadow: '1px 1px 5px 1px  #998fa3',
            }}
            onClick={() => router.push('/spot')}
          >
            <RoomIcon fontSize='inherit' className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14' />
          </IconButton>
        </Stack>
      </Grid>
      {/* <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Stack spacing={2} direction='row'>
          <LinkButton text={'貸出 / 返却'} onClick={() => router.push('/checkout-return')} />
          <LinkButton text={'物品登録'} onClick={() => router.push('/register-item')} />
        </Stack>
      </Grid>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
        <Stack spacing={2} direction='row'>
          <LinkButton text={'物品検索'} onClick={() => router.push('/')} />
          <LinkButton text={'地点情報'} onClick={() => router.push('/spot')} />
        </Stack>
      </Grid> */}
      <Box sx={{ width: '100%', height: '50px' }}></Box>
    </>
  )
}
