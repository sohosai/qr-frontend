'use client'

import React from 'react'
import Header from '@/components/Header'
import SearchPage from '@/components/sub/Search'
import Top from '@/components/Top'

export default function Page() {
  return (
    <>
      <Header />
      <Top />
      <SearchPage />
    </>
  )
}
