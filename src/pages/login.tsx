import React, { useState, useEffect } from 'react'
import AuthDialog from '@/components/AuthDialog'
import router from 'next/router'

const Login = () => {
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (open == false) {
      router.replace('/')
    }
  }, [open])

  return (
    <>
      <AuthDialog is_open={open} handleClose={handleClose}></AuthDialog>
    </>
  )
}

export default Login
