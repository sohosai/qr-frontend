import Head from 'next/head'
import Header from '@/components/Header'
import Button from '@/components/Button'

import usePdf from '@/hooks/usePdf'
import QRListPdf from '@/components/QRCodeListPdf'
import { initQRCode, QRCodeObject } from '@/lib/QRCode'
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
  div {
    font-size: 12px;
    margin: 4px;
    margin-bottom: 10px;
  }
  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
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
      <Head>
        <title>印刷する | QR</title>
        <meta name='description' content='物品管理' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledMain>
        <h1>QRコードを印刷する</h1>
        <div>未印刷のQRコードをまとめて印刷することができます</div>
        <Button disabled={qrs.length === 0} onClick={onClickResetUuid} text='リセット' />
        <div style={{ margin: '15px'}} />
        <hr />
        <QRListPdf ref={targetRef} qrs={qrs} />
        <Button disabled={qrs.length === 0} onClick={onClickDownloadPdf} text='ダウンロード' />
      </StyledMain>
    </>
  )
}
