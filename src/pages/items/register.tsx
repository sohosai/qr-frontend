import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import router from 'next/router'
import styled from 'styled-components'
import CssBaseline from '@mui/material/CssBaseline'

import TextInput from '@/components/TextInput'
import TextArea from '@/components/TextArea'
import SystemButton from '@/components/SystemButton'
import Select from '@/components/Select'
import Header from '@/components/Header'
import Item from '@/components/Item'
import {
  Storage,
  Fixtures,
  QRCodeColor,
  string2storage,
  string2area,
  string2qrcolor,
} from '@/types'
import QrCodeReader from '@/components/QRCodeReader'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import { insert_fixtures } from '@/lib/api'
import AuthDialog from '@/components/AuthDialog'

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
    margin: 4px;
    margin-bottom: 10px;
  }
  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
`

/**
 * 物品を登録できる
 */
const FixturesRegister = () => {
  const [authOpen, setAuthOpen] = useState(false)
  const handleAuthDialogClose = (): void => {
    setAuthOpen(false)
  }

  const [isOpenQrReader, setIsOpenQrReader] = useState(false)

  const [qrID, setQRID] = useState('')

  const [qrColor, setQRColor] = useState('未選択')
  const onChangeQRColor = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setQRColor(event.target.value)
  }

  const [fixturesName, setFixturesName] = useState('')
  const onChangeFixturesName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFixturesName(event.target.value)
  }

  const [modelNumber, setModelNumber] = useState('')
  const onChangeModelNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setModelNumber(event.target.value)
  }

  const [fixturesDescription, setFixturesDescription] = useState('')
  const onChangeFixturesDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFixturesDescription(event.target.value)
  }

  const [repository, setRepository] = useState('未選択')
  const onChangeRepository = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setRepository(event.target.value)
  }

  const [parentID, setParentID] = useState('')
  const onChangeParentID = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setParentID(event.target.value)
  }

  const [note, setNote] = useState('')
  const onChangeNote = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNote(event.target.value)
  }

  const [usage, setUsage] = useState('')
  const onChangeUsage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsage(event.target.value)
  }

  const [usageSeason, setUsageSeason] = useState('')
  const onChangeUsageSeason = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsageSeason(event.target.value)
  }

  const validButton = (): boolean => {
    return (
      fixturesName == '' ||
      qrColor == '未選択' ||
      qrID == '' ||
      parentID == '' ||
      repository == '未選択'
    )
  }

  const onClickRegisterButton = (): void => {
    const now = new Date()
    const storage: Storage = string2storage(repository)
    const qr_color: QRCodeColor = string2qrcolor(qrColor)

    const json: Fixtures = {
      id: uuidv4(),
      created_at: now,
      name: fixturesName,
      description: fixturesDescription,
      storage: storage,
      qr_id: qrID,
      qr_color: qr_color,
      note: note,
      parent_id: parentID,
      model_number: modelNumber == '' ? null : modelNumber,
      usage: usage == '' ? null : usage,
      usage_season: usageSeason == '' ? null : usageSeason,
    }

    ;(async () => {
      const res = await insert_fixtures(json)
      if (res == 'auth') {
        setAuthOpen(true)
      } else if (res == 'env' || res == 'notfound' || res == 'server') {
        toast.error('登録に失敗')
      } else {
        toast.success('登録に成功')
        router.replace(`/items/${qrID}`)
      }
    })()

    setQRID('')
    setQRColor('未選択')
    setFixturesName('')
    setFixturesDescription('')
    setRepository('未選択')
    setNote('')
    setUsage('')
    setUsageSeason('')
    setParentID('')
  }
  return (
    <>
      <StyledMain>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <IconButton
            background-color='#6600CC'
            sx={{
              color: '#6600CC',
              border: '1px solid #6600CC',
              boxShadow: '1px 1px 5px 1px  #998fa3',
              width: '90px',
              height: '90px',
            }}
            onClick={() => {
              setIsOpenQrReader(!isOpenQrReader)
            }}
          >
            <QrCodeScannerIcon
              fontSize='inherit'
              sx={{
                width: '50px',
                height: '50px',
              }}
            />
          </IconButton>
        </Box>
        <h1>物品の登録</h1>
        {isOpenQrReader ? (
          <QrCodeReader
            f={(qr_id) => {
              setQRID(qr_id)
            }}
          />
        ) : (
          <></>
        )}
        <div className='QRColorID'>
          <Item label='QR / BarCode ID' value={qrID} />
        </div>
        <div className='QRColorSelect'>
          <Select
            label='QRコード / バーコード カラー（QRコード / バーコード 実物を見て入力してください）'
            required={true}
            initial='未選択'
            options={['未選択', '赤', '青', '緑', '橙', '紫', '水', '桃', '黄', '茶']}
            onChange={onChangeQRColor}
          />
        </div>
        <div className='FixturesNameTextInput'>
          <TextInput
            label='物品名'
            required={true}
            placeholder='LANケーブル 100m'
            value={fixturesName}
            onChange={onChangeFixturesName}
          />
        </div>
        <div className='FixturesModelNumberTextInput'>
          <TextInput
            label='型番'
            required={false}
            placeholder='SLIK F153'
            value={modelNumber}
            onChange={onChangeModelNumber}
          />
        </div>
        <div className='fixturesDescriptionTextArea'>
          <TextArea
            label='物品詳細'
            required={false}
            placeholder='赤色ケース・緑色パッチシール貼り付け済み'
            text={fixturesDescription}
            onChange={onChangeFixturesDescription}
          />
        </div>
        <div className='fixturesRepositoryOption'>
          <Select
            label='格納場所'
            required={true}
            initial='未選択'
            options={['未選択', '101号室', '102号室', '206号室']}
            onChange={onChangeRepository}
          />
        </div>
        <div className='FixturesParentIDTextInput'>
          <TextInput
            label='親物品ID'
            required={true}
            placeholder='root・root-袋・9E4Q'
            value={parentID}
            onChange={onChangeParentID}
          />
        </div>
        <div className='fixturesNoteTextArea'>
          <TextArea
            label='備考を入力'
            required={false}
            placeholder='22からの引継ぎ'
            text={note}
            onChange={onChangeNote}
          />
        </div>
        <div className='FixturesUsageTextInput'>
          <TextInput
            label='使用用途'
            required={false}
            placeholder='生中継'
            value={usage}
            onChange={onChangeUsage}
          />
        </div>
        <div className='FixturesUsageSeasonTextInput'>
          <TextInput
            label='使用時期'
            required={false}
            placeholder='当日'
            value={usageSeason}
            onChange={onChangeUsageSeason}
          />
        </div>

        <div className='FixturesRegisterButton'>
          <SystemButton onClick={onClickRegisterButton} disabled={validButton()} text='登録' />
        </div>
        <AuthDialog is_open={authOpen} handleClose={handleAuthDialogClose} />
      </StyledMain>
    </>
  )
}

export default FixturesRegister
