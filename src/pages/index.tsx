import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import IconButton from '@mui/material/IconButton'
import QrCodeReader from '@/components/QRCodeReader'
import { useRouter } from 'next/router'

/**
 * QRにログインした際に最初に表示されるトップページ
 * 各ページに飛べるようにボタンを配置する
 */
export default function Home() {
  const router = useRouter()
  const [qrId, setQrId] = useState('')
  const onChangeQrId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQrId(event.target.value)
  }
  const [isOpenQrReader, setIsOpenQrReader] = useState(false)

  useEffect(() => {
    if (qrId !== "") {
      router.replace(`/items/${qrId}`)
    }
  }, [qrId])

  return (
    <>
      <Header />
      <div
        style={{
          fontSize: '21px',
          fontWeight: 'bold',
          margin: '21px',
        }}
      >
        物品管理アプリケーション
      </div>
      {isOpenQrReader ? (
        <QrCodeReader
          onReadCode={(url) => {
            // urlは"https://qr.sohosai.com/items/XWPV"のような形をしている
            const str_lst = url.split('/')
            const id = str_lst.pop()
            if (id) {
              setQrId(id)
            }
          }}
        />
      ) : (
        <></>
      )}
      <IconButton
        size='large'
        background-color='#6600CC'
        sx={{
          color: '#6600CC',
          border: '1px solid #6600CC',
          boxShadow: '1px 1px 5px 1px  #998fa3',
          textAlign: 'cetner'
        }}
        onClick={() => {
          setIsOpenQrReader(!isOpenQrReader)
        }}
      >
        <QrCodeScannerIcon fontSize='inherit' />
      </IconButton>
    </>
  )
}
