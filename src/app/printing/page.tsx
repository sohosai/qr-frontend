"use client";

import Head from 'next/head'
import Header from '@/app/components/Header'
import Button from '@/app/components/Button'
import usePdf from '@/app/hooks/usePdf'
import QRListPdf from '@/app/components/QRCodeListPdf'
import { initQRCode, QRCodeObject } from '@/app/lib/QRCode'
import { useState } from 'react'
import styled from 'styled-components'

const StyledMain = styled.main.withConfig({
  displayName: 'StyledMain',
})`
  position: static;
  margin: 30px 30px;
  font-weight: 700;
  h1 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 16px;
  }
  p {
    font-weight: 300;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`

export default function Printing() {
  const { targetRef, pdfHandler } = usePdf()
  const onClickResetUuid = (): void => {
    let qrids = []
    for (let _ = 0; _ < 70; _++) {
      qrids.push(initQRCode())
    }
    setQRIDs(qrids)
  }
  const [qrs, setQRIDs] = useState<QRCodeObject[]>([])

  const onClickDownloadPdf = (): void => {
    pdfHandler({ name: 'test' })
  }

  return (
    <>
      <Header />
      {/* <Head>
        <title>印刷する | QR</title>
        <meta name='description' content='物品管理' />
        <link rel='icon' href='/favicon.ico' />
      </Head> */}
      <StyledMain>
        <h1 className='h1'>QRコードを印刷する</h1>
        <p className='p'>未印刷のQRコードをまとめて印刷することができます</p>
        <Button disabled={false} onClick={onClickResetUuid} text='生成' />
        <div style={{ margin: '25px' }} />
        <Button disabled={false} onClick={onClickResetUuid} text='リセット' />
        <div style={{ margin: '15px' }} />
        <QRListPdf ref={targetRef} qrs={qrs} />
        <Button disabled={false} onClick={onClickDownloadPdf} text='ダウンロード' />
      </StyledMain>
    </>
  )
}
