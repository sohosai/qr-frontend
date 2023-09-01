import { useMemo, useEffect, useRef } from 'react'
import { Result } from '@zxing/library'
import { BrowserQRCodeReader } from '@zxing/browser'

type QRCodeReaderProps = {
  /**
   * QRCodeに埋め込まれている文字
   */
  onReadCode: (text: string) => void
}

/**
 * カメラを起動してQRCodeが写ったらそこの文字列を取得する
 */
const QrCodeReader = ({ onReadCode }: QRCodeReaderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const codeReader = new BrowserQRCodeReader()
    codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result) => {
      if (result !== undefined) {
        onReadCode(result!.getText())
      }
    })
  }, [onReadCode])
  return <video ref={videoRef} style={{ width: '75%' }}></video>
}

export default QrCodeReader
