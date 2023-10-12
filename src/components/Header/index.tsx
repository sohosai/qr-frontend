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
            <Button LinkComponent={Link} href='https://qr.sohosai.com'>
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
              <Link href='/lending'>貸し出し</Link>
            </ListItem>
            <ListItem key='menu-lending-list'>
              <Link href='/lending/list'>貸し出し中一覧</Link>
            </ListItem>
            <ListItem key='menu-items-search'>
              <Link href='/items/search'>物品検索</Link>
            </ListItem>
            <ListItem key='menu-items-register'>
              <Link href='/items/register'>物品登録</Link>
            </ListItem>
            <ListItem key='menu-spot-register'>
              <Link href='/spot/register'>地点情報の登録</Link>
            </ListItem>
            <ListItem key='menu-printing'>
              <Link href='/printing'>印刷</Link>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </Box>
  )
}

export default Header
