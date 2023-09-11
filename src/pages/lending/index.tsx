import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import Button from '@/components/Button'
import TextInput from '@/components/TextInput'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import IconButton from '@mui/material/IconButton'
import QrCodeReader from '@/components/QRCodeReader'
import Header from '@/components/Header'
import Item from '@/components/Item'
import axios from 'axios'
import { Fixtures, Lending } from '@/types'
import { toast } from 'react-toastify'

const FixturesLending = () => {
  const [qrId, setQrId] = useState('')
  const onChangeQrId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQrId(event.target.value)
  }
  const [isOpenQrReader, setIsOpenQrReader] = useState(false)

  const [spotName, setSpotName] = useState('')
  const onChangeSpotName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSpotName(event.target.value)
  }

  const [borrowerName, setBorrowerName] = useState('')
  const onChangeBorrowerName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBorrowerName(event.target.value)
  }

  const [borrowerNumber, setBorrowerNumber] = useState('')
  const onChangeBorrowerNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBorrowerNumber(event.target.value)
  }

  const [borrowerOrg, setBorrowerOrg] = useState('')
  const onChangeBorrowerOrg = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBorrowerOrg(event.target.value)
  }

  const validButton = (): boolean => {
    return qrId == '' || spotName == '' || borrowerName == '' || borrowerNumber == ''
  }

  const [isLending, setIsLending] = useState(true)

  const onClickRegisterButton = (): void => {
    const uuid = uuidv4()
    const now = new Date()

    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url !== undefined) {
        try {
          const get_fixtures_url = api_url + '/get_fixtures?qr_id=' + qrId
          const get_fixtures_result = await axios.get(get_fixtures_url)
          const fixtures: Fixtures = get_fixtures_result.data.results
          const fixtures_id = fixtures.id
          const url = api_url + '/insert_lending'
          const lending: Lending = {
            id: uuid,
            fixtures_id: fixtures_id,
            spot_name: spotName,
            lending_at: now,
            returned_at: null,
            borrower_name: borrowerName,
            borrower_number: Number(borrowerNumber),
            borrwer_org: borrowerOrg == null ? null : borrowerOrg,
          }
          const result = await axios.post(url, lending)
          toast.success('貸し出しに成功しました')
          return result
        } catch (err) {
          toast.error('貸し出しに失敗しました')
        }
      }
    })()
    // 初期化
    setQrId('')
    setSpotName('')
    setBorrowerName('')
    setBorrowerNumber('')
    setBorrowerOrg('')
    setIsLending(true)
  }

  const onClickReturnedButton = (): void => {
    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url !== undefined) {
        const url = api_url + '/returned_lending?qr_id=' + qrId
        try {
          const result = await axios.post(url)
          toast.success('返却に成功しました')
          return result
        } catch (err) {
          toast.error('返却に失敗しました')
        }
      }
    })()

    // 初期化
    setQrId('')
    setSpotName('')
    setBorrowerName('')
    setBorrowerNumber('')
    setBorrowerOrg('')
    setIsLending(true)
  }

  return (
    <>
      <Header />
      {isOpenQrReader ? (
        <QrCodeReader
          onReadCode={(url) => {
            // urlは"https://qr.sohosai.com/items/XWPV"のような形をしている
            const str_lst = url.split('/')
            const id = str_lst.pop()
            if (id !== undefined) {
              // Fixtures IDが貸し出し中だったら返却画面に
              // 貸し出されていなかったら貸し出し画面に
              setIsLending(true)
              setQrId(id)
            }
          }}
        />
      ) : (
        <></>
      )}
      {isLending ? (
        // 貸し出し画面
        <>
          <div>
            <TextInput
              label='貸し出し物品のID'
              placeholder=''
              value={qrId}
              onChange={onChangeQrId}
            />
          </div>
          <div>
            <TextInput
              label='持っていく場所（必須）'
              placeholder='3C201'
              value={spotName}
              onChange={onChangeSpotName}
            />
          </div>
          <div>
            <TextInput
              label='借りる人の名前（必須）'
              placeholder='情シス太郎'
              value={borrowerName}
              onChange={onChangeBorrowerName}
            />
          </div>
          <div>
            <TextInput
              label='借りる人の学籍番号（必須）'
              placeholder='202200000'
              value={borrowerNumber}
              onChange={onChangeBorrowerNumber}
            />
          </div>
          <div>
            <TextInput
              label='借りる人の所属団体（必須）'
              placeholder='情シス'
              value={borrowerOrg}
              onChange={onChangeBorrowerOrg}
            />
          </div>
          <div className='LendingRegisterButton'>
            <Button onClick={onClickRegisterButton} disabled={validButton()} text='貸し出し' />
          </div>
        </>
      ) : (
        // 返却画面
        <>
          <Item label='返却機材ID' value={qrId} />
          <div className='ReturnedButton'>
            <Button onClick={onClickReturnedButton} disabled={true} text='返却' />
          </div>
        </>
      )}
      <IconButton
        size='large'
        onClick={() => {
          setIsOpenQrReader(!isOpenQrReader)
        }}
      >
        <QrCodeScannerIcon fontSize='inherit' />
      </IconButton>
    </>
  )
}

export default FixturesLending
