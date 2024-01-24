import Head from 'next/head'
import router, { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import CssBaseline from '@mui/material/CssBaseline'
import CustomHead from '@/components/CustomHead'

import TextInput from '@/components/TextInput'
import TextArea from '@/components/TextArea'
import SytemButton from '@/components/SystemButton'
import Select from '@/components/Select'
import Header from '@/components/Header'
import {
  Storage,
  Fixtures,
  QRCodeColor,
  qrcolor2string,
  string2qrcolor,
  string2storage,
  storage2string,
} from '@/types'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import { get_fixtures, update_fixtures } from '@/lib/api'
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
const FixturesEdit = () => {
  const router = useRouter()

  const [authOpen, setAuthOpen] = useState(false)
  const handleAuthDialogClose = (): void => {
    setAuthOpen(false)
  }

  const [fixtures, setFixtures] = useState<Fixtures | null>(null)

  const [qrID, setQRID] = useState('')
  const onChangeQRID = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQRID(event.target.value)
  }

  const [qrColor, setQRColor] = useState('未選択')
  const onChangeQRColor = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setQRColor(event.target.value)
  }

  const [initialQRColor, setInitialQRColor] = useState('')

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

  const [initialRepository, setInitialRepository] = useState('')

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

  useEffect(() => {
    if (typeof router.query.fixtures_id !== 'string') return

    const fixtures_id = router.query.fixtures_id
    if (fixtures_id) {
      console.log('called')
      ;(async () => {
        const fixtures_res = await get_fixtures({ id_type: 'FixturesId', id: fixtures_id })
        if (fixtures_res == 'auth') {
          setAuthOpen(true)
        } else if (
          fixtures_res == 'env' ||
          fixtures_res == 'notfound' ||
          fixtures_res == 'server' ||
          fixtures_res == 'void'
        ) {
          toast.error('取得に失敗')
        } else {
          setFixtures(fixtures_res)
          setQRID(fixtures_res.qr_id)
          setQRColor(qrcolor2string(fixtures_res.qr_color))
          setInitialQRColor(qrcolor2string(fixtures_res.qr_color))
          setFixturesName(fixtures_res.name)
          {
            fixtures_res.description
              ? setFixturesDescription(fixtures_res.description)
              : setFixturesDescription('')
          }
          {
            fixtures_res.model_number
              ? setModelNumber(fixtures_res.model_number)
              : setModelNumber('')
          }
          {
            fixtures_res.usage ? setUsage(fixtures_res.usage) : setUsage('')
          }
          {
            fixtures_res.usage_season
              ? setUsageSeason(fixtures_res.usage_season)
              : setUsageSeason('')
          }
          {
            setRepository(storage2string(fixtures_res.storage))
          }
          {
            setInitialRepository(storage2string(fixtures_res.storage))
          }
          setNote(fixtures_res.note)
          setParentID(fixtures_res.parent_id)
        }
      })()
    }
  }, [router])

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
    if (fixtures) {
      const storage: Storage = string2storage(repository)
      const qr_color: QRCodeColor = string2qrcolor(qrColor)

      const json: Fixtures = {
        id: fixtures.id,
        created_at: fixtures.created_at,
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
        const res = await update_fixtures(json)
        if (res == 'auth') {
          setAuthOpen(true)
        } else if (res == 'env' || res == 'notfound' || res == 'server') {
          toast.error('更新に失敗')
          router.replace(`/items/${qrID}`)
        } else {
          toast.success('更新に成功')
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
    } else {
      toast.error('更新に失敗')
    }
  }
  return (
    <>
      <CustomHead />
      <Header />
      <Box sx={{ width: '100%', height: '120px' }}></Box>
      <Box sx={{ width: '100%', maxWidth: '1024px', m: 'auto' }}>
        <StyledMain>
          <h1>物品情報の編集</h1>
          <div className='QRColorID'>
            <TextInput
              label='QR / BarCode ID'
              required={true}
              placeholder='x234'
              value={qrID}
              onChange={onChangeQRID}
            />
          </div>
          <div className='QRColorSelect'>
            <Select
              label='QRコード / バーコード カラー（QRコード / バーコード 実物を見て入力してください）'
              required={true}
              initial={initialQRColor}
              options={['赤', '青', '緑', '橙', '紫', '水', '桃', '黄', '茶']}
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
              initial={initialRepository}
              options={['101号室', '102号室', '206号室']}
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
            <SytemButton onClick={onClickRegisterButton} disabled={validButton()} text='更新' />
          </div>
          <AuthDialog is_open={authOpen} handleClose={handleAuthDialogClose} />
        </StyledMain>
      </Box>
    </>
  )
}

export default FixturesEdit
