import { useEffect, useRef } from 'react'
import { BrowserQRCodeReader } from '@zxing/browser'
import { Box } from '@mui/material'

type QRCodeReaderProps = {
  /**
   * QRCodeに埋め込まれている文字
   */
  f: (text: string) => void
}

/**
 * カメラを起動してQRCodeが写ったらそこの文字列を取得する
 * `https://qr.sohosai.com/items/[qr_id]`という形式であるかをチェックし、
 * qr_idを引数のfに渡す
 *
 */
const QrCodeReader = ({ f }: QRCodeReaderProps) => {
  const regex = new RegExp('^https://qr.sohosai.com/items/(.+)$')

  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const codeReader = new BrowserQRCodeReader()
    codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result) => {
      if (result) {
        const text = result!.getText()
        const match = text.match(regex)
        if (match) {
          const qr_id = match[1]
          f(qr_id)
        }
      }
    })
  }, [f])
  return (
    <Box sx={{ widht: '100%' }}>
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: '700px', display: 'block', margin: 'auto' }}
      ></video>
    </Box>
  )
}

export default QrCodeReader
