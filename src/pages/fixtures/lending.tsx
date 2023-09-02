import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import Button from '@/components/Button'
import TextInput from '@/components/TextInput'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import IconButton from '@mui/material/IconButton'
import QrCodeReader from '@/components/QRCodeReader'

const FixturesLending = () => {
  const [fixturesId, setFixturesId] = useState('')
  const onChangeFixturesId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFixturesId(event.target.value)
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
    return fixturesId == '' || spotName == '' || borrowerName == '' || borrowerNumber == ''
  }

  const [isLending, setIsLending] = useState(true)

  const onClickRegisterButton = (): void => {
    const uuid = uuidv4()
    // 初期化
    setFixturesId('')
    setSpotName('')
    setBorrowerName('')
    setBorrowerNumber('')
    setBorrowerOrg('')
    setIsLending(true)
  }

  const onClickReturnedButton = (): void => {
    // 初期化
    setFixturesId('')
    setSpotName('')
    setBorrowerName('')
    setBorrowerNumber('')
    setBorrowerOrg('')
    setIsLending(true)
  }

  return (
    <>
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
              setFixturesId(id)
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
              value={fixturesId}
              onChange={onChangeFixturesId}
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
          <p>返却機材ID：{fixturesId}</p>
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
