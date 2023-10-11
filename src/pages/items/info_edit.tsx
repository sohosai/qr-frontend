import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import CssBaseline from '@mui/material/CssBaseline'

import TextInput from '@/components/TextInput'
import TextArea from '@/components/TextArea'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Header from '@/components/Header'
import Item from '@/components/Item'
import { Storage, Fixtures, QRCodeColor, QRCodeColorsToKanji } from '@/types'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'
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
  const route = useRouter()

  const [fixtures, setFixtures] = useState<Fixtures | null>(null)
  const [queried, setQueried] = useState(false)

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
    if (typeof route.query.fixtures_id !== 'string') return

    const fixtures_id = route.query.fixtures_id
    const api_url = process.env.NEXT_PUBLIC_QR_API_URL
    if (fixtures_id && api_url) {
      console.log('called')
      ;(async () => {
        const url_fixtures = api_url + '/get_fixtures?id=' + fixtures_id
        console.log({ url_fixtures })
        setQueried(true)
        try {
          const response_fixtures = await axios.get(url_fixtures)
          const fixtures_data: Fixtures = response_fixtures.data
          setFixtures(fixtures_data)
          setQRID(fixtures_data.qr_id)
          setQRColor(QRCodeColorsToKanji[fixtures_data.qr_color])
          setInitialQRColor(QRCodeColorsToKanji[fixtures_data.qr_color])
          setQRColor('赤')
          setFixturesName(fixtures_data.name)
          {
            fixtures_data.description
              ? setFixturesDescription(fixtures_data.description)
              : setFixturesDescription('')
          }
          {
            fixtures_data.model_number
              ? setModelNumber(fixtures_data.model_number)
              : setModelNumber('')
          }
          {
            fixtures_data.usage ? setUsage(fixtures_data.usage) : setUsage('')
          }
          {
            fixtures_data.usage_season
              ? setUsageSeason(fixtures_data.usage_season)
              : setUsageSeason('')
          }
          {
            fixtures_data.storage == 'room101'
              ? setRepository('101号室')
              : fixtures_data.storage == 'room102'
              ? setRepository('102号室')
              : setRepository('206号室')
          }
          {
            fixtures_data.storage == 'room101'
              ? setInitialRepository('101号室')
              : fixtures_data.storage == 'room102'
              ? setInitialRepository('102号室')
              : setInitialRepository('206号室')
          }
          setNote(fixtures_data.note)
          setParentID(fixtures_data.parent_id)
        } catch (err) {
          toast.error('URLが無効なため失敗')
          setFixtures(null)
        }
      })()
    } else {
      setQueried(false)
    }
  }, [route])

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
    const storage: Storage =
      repository == '101号室' ? 'room101' : repository == '102号室' ? 'room102' : 'room206'
    const qr_color: QRCodeColor =
      qrColor == '赤'
        ? 'red'
        : qrColor == '青'
        ? 'blue'
        : qrColor == '緑'
        ? 'green'
        : qrColor == '橙'
        ? 'orange'
        : qrColor == '紫'
        ? 'purple'
        : qrColor == '水'
        ? 'light_blue'
        : qrColor == '桃'
        ? 'pink'
        : qrColor == '黄'
        ? 'yellow'
        : 'brown'

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
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url !== undefined) {
        const url = api_url + '/update_fixtures'
        try {
          const result = await axios.post(url, json)
          toast.success('更新に成功')
          return result
        } catch (err) {
          toast.error('更新に失敗')
        }
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
      <Header />
      <CssBaseline />
      <Head>
        <title>物品の編集 | QR</title>
        <meta name='description' content='物品管理' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledMain>
        <h1>物品の登録</h1>
        <div className='QRColorID'>
          <TextInput
            label='QR ID'
            required={true}
            placeholder='x234'
            value={qrID}
            onChange={onChangeQRID}
          />
        </div>
        <div className='QRColorSelect'>
          <Select
            label='QRコードカラー（QRコード実物を見て入力してください）'
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
          <Button onClick={onClickRegisterButton} disabled={validButton()} text='更新' />
        </div>
      </StyledMain>
    </>
  )
}

export default FixturesEdit
