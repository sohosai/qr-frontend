import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import SystemButton from '@/components/SystemButton'
import TextInput from '@/components/TextInput'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import IconButton from '@mui/material/IconButton'
import QrCodeReader from '@/components/QRCodeReader'
import Item from '@/components/Item'
import axios from 'axios'
import { Fixtures, Lending, Spot } from '@/types'
import { toast } from 'react-toastify'
import Select from '@/components/Select'
import styled from 'styled-components'

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

const Lending = () => {
  const [qrId, setQrId] = useState('')
  const onChangeQrId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQrId(event.target.value)
  }
  const [isOpenQrReader, setIsOpenQrReader] = useState(false)

  const [spotNameList, setSpotNameList] = useState<string[]>([])
  useEffect(() => {
    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url) {
        const get_spot_list_url = api_url + '/get_spot_list'
        try {
          const get_spot_list_reslt = await axios.get(get_spot_list_url)
          const spot_list: Spot[] = get_spot_list_reslt.data
          setSpotNameList(spot_list.map((spot) => spot.name))
        } catch {
          setSpotNameList([])
        }
      }
    })()
  }, [])

  const [spotName, setSpotName] = useState('')
  const onChangeSpotName = (event: React.ChangeEvent<HTMLSelectElement>): void => {
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
    return (
      qrId == '' ||
      spotName == '未選択' ||
      spotName == '' ||
      borrowerName == '' ||
      borrowerNumber == ''
    )
  }

  const [isLending, setIsLending] = useState(true)

  useEffect(() => {
    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url) {
        if (qrId !== '') {
          const get_lending_url = api_url + '/get_lending?fixtures_qr_id=' + qrId
          try {
            const get_lending_result = await axios.get(get_lending_url)
            const lending: Lending = get_lending_result.data
            if (lending.fixtures_qr_id == qrId) {
              setIsLending(false)
            } else {
              setIsLending(true)
            }
          } catch {
            setIsLending(true)
          }
        }
      }
    })()
  }, [qrId])

  const onClickRegisterButton = (): void => {
    const uuid = uuidv4()
    const now = new Date()

    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url) {
        try {
          const get_fixtures_url = api_url + '/get_fixtures?qr_id=' + qrId
          const get_fixtures_result = await axios.get(get_fixtures_url)
          const fixtures: Fixtures = get_fixtures_result.data
          const fixtures_id = fixtures.id
          const url = api_url + '/insert_lending'
          const lending: Lending = {
            id: uuid,
            fixtures_id: fixtures_id,
            fixtures_qr_id: qrId,
            spot_name: spotName,
            lending_at: now,
            returned_at: null,
            borrower_name: borrowerName,
            borrower_number: Number(borrowerNumber),
            borrwer_org: borrowerOrg == '' ? null : borrowerOrg,
          }
          const headers = {
            'Content-Type': 'application/json',
          }
          const result = await axios.post(url, lending, { headers: headers })
          if (100 < result.status && result.status < 300) {
            toast.success('貸し出しに成功しました')
            // 初期化
            setQrId('')
            setSpotName('')
            setBorrowerName('')
            setBorrowerNumber('')
            setBorrowerOrg('')
            setIsLending(true)
          } else {
            toast.error('貸し出しに失敗しました')
          }
        } catch (err) {
          toast.error('貸し出しに失敗しました')
        }
      }
    })()
  }

  const onClickReturnedButton = (): void => {
    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url) {
        const url = api_url + '/returned_lending?qr_id=' + qrId
        console.log(url)
        try {
          const result = await axios.post(url)
          if (100 < result.status && result.status < 300) {
            toast.success('返却に成功しました')
            // 初期化
            setQrId('')
            setSpotName('')
            setBorrowerName('')
            setBorrowerNumber('')
            setBorrowerOrg('')
            setIsLending(true)
          } else {
            toast.error('返却に失敗しました')
          }
          return result
        } catch (err) {
          toast.error('返却に失敗しました')
        }
      }
    })()
  }

  return (
    <>
      <StyledMain>
        {isOpenQrReader ? (
          <QrCodeReader
            f={(qr_id) => {
              setIsLending(true)
              setQrId(qr_id)
            }}
          />
        ) : (
          <></>
        )}
        {isLending ? (
          <>
            <h1>貸し出し・返却</h1>
            <div>
              <TextInput
                label='貸し出し物品又は返却物品のID'
                required={true}
                placeholder=''
                value={qrId}
                onChange={onChangeQrId}
              />
            </div>
            <div>
              <Select
                label='持っていく場所'
                required={true}
                initial='未選択'
                options={spotNameList}
                onChange={onChangeSpotName}
              />
            </div>
            <div>
              <TextInput
                label='借りる人の名前'
                required={true}
                placeholder='情シス太郎'
                value={borrowerName}
                onChange={onChangeBorrowerName}
              />
            </div>
            <div>
              <TextInput
                label='借りる人の学籍番号'
                required={true}
                placeholder='202200000'
                value={borrowerNumber}
                onChange={onChangeBorrowerNumber}
              />
            </div>
            <div>
              <TextInput
                label='借りる人の所属団体'
                required={false}
                placeholder='情シス'
                value={borrowerOrg}
                onChange={onChangeBorrowerOrg}
              />
            </div>
            <div className='LendingRegisterButton'>
              <SystemButton
                onClick={onClickRegisterButton}
                disabled={validButton()}
                text='貸し出し'
              />
            </div>
            <IconButton
              size='large'
              background-color='#6600CC'
              sx={{
                color: '#6600CC',
                border: '1px solid #6600CC',
                boxShadow: '1px 1px 5px 1px  #998fa3',
              }}
              onClick={() => {
                setIsOpenQrReader(!isOpenQrReader)
              }}
            >
              <QrCodeScannerIcon fontSize='inherit' />
            </IconButton>
          </>
        ) : (
          // 返却画面
          <>
            <Item label='返却機材ID' value={qrId} />
            <div className='ReturnedButton'>
              <SystemButton onClick={onClickReturnedButton} disabled={false} text='返却' />
            </div>
          </>
        )}
      </StyledMain>
    </>
  )
}

export default Lending
