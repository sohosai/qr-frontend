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
import Link from 'next/link'
import Button from '@mui/material/Button'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}))

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => {
                window.location.href = '/'
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
        </Toolbar>
        <Drawer
          anchor='right'
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false)
          }}
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
                  window.location.href = '/'
                }}
              >
                <ListItemText primary='物品検索' />
              </ListItemButton>
            </ListItem>
            <ListItem key='menu-lending-list'>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => {
                  window.location.href = '/sub/lending'
                }}
              >
                <ListItemText primary='貸出 / 返却' />
              </ListItemButton>
            </ListItem>
            <ListItem key='menu-items-search'>
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={() => {
                  window.location.href = '/sub/register'
                }}
              >
                <ListItemText primary='登録' />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </Box>
  )
}

export default Header
