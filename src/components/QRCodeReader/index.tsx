import React, { useMemo, useEffect, useRef, useState } from 'react'
//import {useZxing} from "react-zxing"
import { BrowserQRCodeReader } from '@zxing/browser'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Modal from 'react-modal'

type QRCodeReaderProps = {
  /**
   * QRCodeに埋め込まれている文字をどうするのかの処理
   */
  onReadCode: (text: string) => void
  /**
   * 期待する入力であったかどうかの判定
   * モーダルを閉じるのに使う
   */
  validate: (text: string) => boolean
}

/**
 * カメラを起動してQRCodeが写ったらそこの文字列を取得する
 * カメラを起動するためのボタンや閉じる機能なども提供する
 */
const QrCodeReader = ({ onReadCode, validate }: QRCodeReaderProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  /*
  useEffect(() => {
    const codeReader = new BrowserQRCodeReader()
    codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result) => {
      if (result) {
        onReadCode(result!.getText())
      }
    })
  }, [onReadCode])
  */

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader()
    codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result) => {
      if (result) {
        onReadCode(result!.getText())
      }
    })
  }, [open])

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          content: {
            textAlign: 'center',
            width: '75%',
            height: '50%',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid #000',
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <video ref={videoRef} style={{ width: '65%', textAlign: 'center' }}></video>
          <p>ホゲホゲ</p>
          <IconButton
            size='large'
            background-color='#b7282e'
            sx={{
              color: '#b7282e',
              border: '1px solid #b7282e',
              boxShadow: '1px 1px 5px 1px #998fa3',
            }}
            onClick={handleClose}
          >
            <HighlightOffIcon fontSize='inherit' />
          </IconButton>
        </Box>
      </Modal>
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <IconButton
          size='large'
          background-color='#6600CC'
          sx={{
            color: '#6600CC',
            border: '1px solid #6600CC',
            boxShadow: '1px 1px 5px 1px #998fa3',
          }}
          onClick={handleOpen}
        >
          <QrCodeScannerIcon fontSize='inherit' />
        </IconButton>
      </Box>
    </>
  )
}

export default QrCodeReader
