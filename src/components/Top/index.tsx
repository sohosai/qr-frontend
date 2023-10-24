'use client'

import React from 'react'
import { Box, Stack, Grid } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import { useRouter } from 'next/router'

export default function Top() {
  const router = useRouter()

  return (
    <>
      <h1 className='p-10 text-center text-3xl'>物品管理アプリケーション</h1>
      <Grid container alignItems='center' justifyContent='center' direction='column'>
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
      </Grid>
      <Box sx={{ width: '100%', height: '50px' }}></Box>
    </>
  )
}
