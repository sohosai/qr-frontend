'use client'

import React from 'react'
import { Box, Stack, Grid, IconButton, Button } from '@mui/material'
import { useRouter } from 'next/router'
import SearchIcon from '@mui/icons-material/Search'
import RoomIcon from '@mui/icons-material/Room'
import CategoryIcon from '@mui/icons-material/Category'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'

export default function Top() {
  const router = useRouter()

  return (
    <>
      <Box sx={{ width: '100%', height: '150px' }}></Box>
      <div style={{ fontSize: '36px' }} className='block p-10 text-center'>
        <span className='inline-block'>物品管理</span>
        <span className='inline-block'>アプリ -Dashi-</span>
      </div>
      <Box sx={{ width: '100%', height: '50px' }}></Box>
      <div style={{ width: '100%', margin: 'auto', maxWidth: '1024px', padding: '0px' }}>
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          className=' m-auto flex w-fit max-w-full flex-row gap-10'
        >
          <div className='m-0 max-w-full p-2'>
            <Link href={'/'}>
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
                >
                  <SearchIcon fontSize='inherit' sx={{ width: '40px', height: '40px' }} />
                </IconButton>
                <p style={{ margin: 0 }}>
                  <span style={{ fontSize: '18px' }} className='font-bold'>
                    検索
                  </span>
                  <br />
                  <span>物品を検索します。</span>
                </p>
              </Stack>
            </Link>
          </div>

          <div className='m-0 max-w-full p-2'>
            <Link href={'/checkout-return'}>
              <Stack
                spacing={2}
                sx={{ width: '400px' }}
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
                >
                  <CategoryIcon fontSize='inherit' sx={{ width: '40px', height: '40px' }} />
                </IconButton>
                <p style={{ margin: 0 }}>
                  <span style={{ fontSize: '18px' }} className='font-bold'>
                    貸出 / 返却
                  </span>
                  <br />
                  <span>
                    物品の貸出 / 返却用
                    <br />
                    QRコード / バーコード を読み取ります。
                  </span>
                </p>
              </Stack>
            </Link>
          </div>

          <div className='m-0 max-w-full p-2'>
            <Link href={'/register-item'}>
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
                >
                  <AddIcon fontSize='inherit' sx={{ width: '40px', height: '40px' }} />
                </IconButton>
                <p style={{ margin: 0 }}>
                  <span style={{ fontSize: '18px' }} className='font-bold'>
                    登録
                  </span>
                  <br />
                  <span>
                    物品登録・QRコード / バーコード の
                    <br />
                    印刷します。
                  </span>
                </p>
              </Stack>
            </Link>
          </div>
          <div className='m-0 max-w-full p-2'>
            <Link href={'/spot'}>
              <Stack
                spacing={2}
                direction='row'
                sx={{ width: '400px' }}
                className=' items-center gap-10'
              >
                <IconButton
                  aria-label='spot'
                  color='info'
                  sx={{
                    border: '1px solid #0288d1',
                    boxShadow: '1px 1px 5px 1px  #998fa3',
                  }}
                >
                  <RoomIcon fontSize='inherit' sx={{ width: '40px', height: '40px' }} />
                </IconButton>
                <p style={{ margin: 0 }}>
                  <span style={{ fontSize: '18px' }} className='font-bold'>
                    位置情報
                  </span>
                  <br />
                  <span>物品の位置を管理します。</span>
                </p>
              </Stack>
            </Link>
          </div>
        </Grid>
      </div>

      <Box sx={{ width: '100%', height: '50px' }}></Box>
    </>
  )
}
