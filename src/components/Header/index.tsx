'use client'

import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useRouter } from 'next/router'
import Link from 'next/link'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}))

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', width: '100%', zIndex: '1' }}>
      <AppBar position='static' color='default'>
        <Toolbar sx={{ width: '100%', maxWidth: '1110px', m: 'auto' }}>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => {
                router.push('/')
              }}
            >
              <p
                style={{
                  color: '#6600CC',
                  fontSize: '21px',
                  fontWeight: 'bold',
                  margin: '10px',
                }}
              >
                QR
                <br />
                物品管理
              </p>
            </Button>
          </Typography>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
          <div className='header-PC'>
            <Box sx={{ display: 'flex' }}>
              <Link href={'/login'} className='p-5 text-base font-bold text-gray-800'>
                ログイン
              </Link>
              <Link href={'/'} className='p-5 text-base font-bold text-gray-800'>
                物品検索
              </Link>
              <Link href={'/checkout-return'} className='p-5 text-base font-bold text-gray-800'>
                貸出 / 返却
              </Link>
              <Link href={'/register-item'} className='p-5 text-base font-bold text-gray-800'>
                物品登録
              </Link>
              <Link href={'/spot'} className='p-5 text-base font-bold text-gray-800'>
                位置情報
              </Link>
            </Box>
          </div>
          <div className='md:hidden'>
            <IconButton
              size='large'
              edge='end'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => {
                setMenuOpen(true)
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Drawer
          anchor='right'
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false)
          }}
          sx={{ zindex: '2' }}
        >
          <DrawerHeader>
            <IconButton
              onClick={() => {
                setMenuOpen(false)
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem key='menu-lending'>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => {
                  router.replace('/')
                  setMenuOpen(false)
                }}
              >
                <ListItemText primary='物品検索' />
              </ListItemButton>
            </ListItem>
            <ListItem key='menu-lending-list'>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => {
                  router.replace('/checkout-return')
                  setMenuOpen(false)
                }}
              >
                <ListItemText primary='貸出 / 返却' />
              </ListItemButton>
            </ListItem>
            <ListItem key='menu-items-search'>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => {
                  router.replace('/register-item')
                  setMenuOpen(false)
                }}
              >
                <ListItemText primary='物品登録' />
              </ListItemButton>
            </ListItem>
            <ListItem key='menu-items-search'>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => {
                  router.replace('/spot')
                  setMenuOpen(false)
                }}
              >
                <ListItemText primary='地点情報' />
              </ListItemButton>
            </ListItem>
            <ListItem key='menu-login'>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => {
                  router.replace('/login')
                  setMenuOpen(false)
                }}
              >
                <ListItemText primary='ログイン' />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </Box>
  )
}

export default Header
