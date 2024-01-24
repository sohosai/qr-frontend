// import Head from 'next/head'
import Header from '@/components/Header'
import SystemButton from '@/components/SystemButton'

import usePdf from '@/hooks/usePdf'
import QRListPdf from '@/components/QRCodeListPdf'
import { initQRCode, QRCodeObject } from '@/lib/QRCode'
import { useState } from 'react'
import styled from 'styled-components'
import { Box } from '@mui/material'
import { toast } from 'react-toastify'

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
  const [clicked, setClicked] = useState(0)
  const [isQr, setIsQr] = useState(true)

  const onClickResetUuid = (): void => {
    setClicked(1)
    let qrids = []
    for (let _ = 0; _ < 70; _++) {
      qrids.push(initQRCode())
    }
    setQRIDs(qrids)
  }
  const [qrs, setQRIDs] = useState<QRCodeObject[]>([])

  const onClickDownloadPdf = (): void => {
    if (clicked === 0) {
      toast.error('QRコード / バーコード が生成されていません。')
    } else if (clicked === 1) {
      pdfHandler({ name: 'test' })
    } else {
      toast.error('予期せぬエラーが発生しました。')
    }
  }

  const onClickQr = (): void => {
    if (clicked === 0) {
      toast.error('QRコード / バーコード が生成されていません。')
    } else if (clicked === 1) {
      setIsQr(!isQr)
    } else {
      toast.error('予期せぬエラーが発生しました。')
    }
  }

  return (
    <>
      <StyledMain>
        <h1>QRコードを印刷する</h1>
        <p>未印刷のQRコードをまとめて印刷することができます</p>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <SystemButton disabled={false} onClick={onClickResetUuid} text='生成 /再生成' />
          <div style={{ height: '1px', width: '12px' }}></div>
          <SystemButton disabled={false} onClick={onClickDownloadPdf} text='ダウンロード' />
        </Box>
        <Box sx={{ width: '100%', height: '30px' }}></Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <SystemButton disabled={false} onClick={onClickQr} text='QR / BarCode' />
        </Box>
        <QRListPdf ref={targetRef} qrs={qrs} isQr={isQr} />
        {clicked === 0 ? <Box sx={{ width: '100%', height: '150px' }}></Box> : <></>}
      </StyledMain>
    </>
  )
}
