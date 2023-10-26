'use client'

import React from 'react'
import Header from '@/components/Header'
import LendingPage from '@/components/sub/Lending'
import Top from '@/components/Top'

export default function Page() {
  return (
    <>
      <Header />
      <Top />
      <LendingPage />
    </>
  )
}
