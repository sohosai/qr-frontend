import Head from 'next/head'
import Header from '@/components/Header'
import SystemButton from '@/components/SystemButton'

import usePdf from '@/hooks/usePdf'
import QRListPdf from '@/components/QRCodeListPdf'
import { initQRCode, QRCodeObject } from '@/lib/QRCode'
import { useState } from 'react'
import styled from 'styled-components'
import { Box } from '@mui/material'

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
      <StyledMain>
        <h1>QRコードを印刷する</h1>
        <p>未印刷のQRコードをまとめて印刷することができます</p>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <SystemButton disabled={false} onClick={onClickResetUuid} text='生成 /再生成' />
          <SystemButton disabled={false} onClick={onClickDownloadPdf} text='ダウンロード' />
        </Box>
        <QRListPdf ref={targetRef} qrs={qrs} />
      </StyledMain>
    </>
  )
}
