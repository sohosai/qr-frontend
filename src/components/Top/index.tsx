'use client'

import React from 'react'
import { Box, Stack, Grid, IconButton, Button } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search'
import RoomIcon from '@mui/icons-material/Room'
import CategoryIcon from '@mui/icons-material/Category'
import AddIcon from '@mui/icons-material/Add'

export default function Top() {
  const router = useRouter()

  return (
    <>
      <Box sx={{ width: '100%', height: '150px' }}></Box>
      <div className='block p-10 text-center text-3xl'>
        <span className='inline-block'>物品管理</span>
        <span className='inline-block'>アプリケーション</span>
      </div>
      <Box sx={{ width: '100%', height: '50px' }}></Box>
      <Box sx={{ width: '100%', m: 'auto', maxWidth: '1024px' }}>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          direction='column'
          className=' m-auto flex w-fit max-w-full flex-row gap-10 p-5'
        >
          <Stack
            spacing={2}
            sx={{ width: '392px' }}
            direction='row'
            className='w-98 max-w-full items-center gap-10'
          >
            <IconButton
              aria-label='search'
              color='info'
              sx={{
                border: '1px solid #0288d1',
                boxShadow: '1px 1px 5px 1px  #998fa3',
              }}
              onClick={() => router.push('/')}
            >
              <SearchIcon
                fontSize='inherit'
                className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14'
              />
            </IconButton>
            検索
            <br />
            物品を検索します。
          </Stack>

          <Stack
            spacing={2}
            sx={{ width: '392px' }}
            direction='row'
            className='w-98 max-w-full items-center gap-10'
          >
            <IconButton
              aria-label='checkout-return'
              color='info'
              sx={{
                border: '1px solid #0288d1',
                boxShadow: '1px 1px 5px 1px  #998fa3',
              }}
              onClick={() => router.push('/checkout-return')}
            >
              <CategoryIcon
                fontSize='inherit'
                className='h-10 w-10 max-w-full sm:h-12 sm:w-12 md:h-14 md:w-14'
              />
            </IconButton>
            貸出 / 返却
            <br />
            物品の貸出 / 返却用QRコードを読み取ります。
          </Stack>

          <Stack
            spacing={2}
            sx={{ width: '392px' }}
            direction='row'
            className='w-98 max-w-full items-center gap-10'
          >
            <IconButton
              aria-label='regisration'
              color='info'
              sx={{
                border: '1px solid #0288d1',
                boxShadow: '1px 1px 5px 1px  #998fa3',
              }}
              onClick={() => router.push('/register-item')}
            >
              <AddIcon fontSize='inherit' className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14' />
            </IconButton>
            登録
            <br />
            物品登録・QRコードの印刷できます。
          </Stack>

          <Stack
            spacing={2}
            direction='row'
            sx={{ width: '392px' }}
            className=' items-center gap-10'
          >
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
            位置情報
            <br />
            物品の位置を管理します。
          </Stack>
        </Grid>
      </Box>

      <Box sx={{ width: '100%', height: '50px' }}></Box>
    </>
  )
}
