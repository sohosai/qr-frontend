'use client'

import React from 'react'
import Header from '@/components/Header'
import LendingPage from '@/components/sub/Lending'
import Top from '@/components/Top'
import CustomHead from '@/components/CustomHead'

export default function Page() {
  return (
    <>
      <CustomHead />
      <Header />
      <Top />
      <LendingPage />
    </>
  )
}
