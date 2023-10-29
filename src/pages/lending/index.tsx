import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import SystemButton from '@/components/SystemButton'
import TextInput from '@/components/TextInput'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import IconButton from '@mui/material/IconButton'
import QrCodeReader from '@/components/QRCodeReader'
import Item from '@/components/Item'
import { Lending } from '@/types'
import { toast } from 'react-toastify'
import Select from '@/components/Select'
import styled from 'styled-components'
import { Box } from '@mui/material'
import {
  insert_lending,
  get_fixtures,
  get_spot_list,
  get_is_lending,
  returned_lending,
} from '@/lib/api'

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
      const spot_list = await get_spot_list()
      if (spot_list == 'auth') {
        toast.error('認証')
      } else if (spot_list == 'env' || spot_list == 'notfound' || spot_list == 'server') {
        setSpotNameList([])
      } else {
        setSpotNameList(spot_list.map((spot) => spot.name))
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
      const is_lending = await get_is_lending({ id_type: 'FixturesQrId', id: qrId })
      if (is_lending == 'auth') {
        toast.error('認証')
      } else if (is_lending == 'env' || is_lending == 'notfound' || is_lending == 'server') {
        setIsLending(false)
      } else {
        setIsLending(is_lending)
      }
    })()
  }, [qrId])

  const onClickRegisterButton = (): void => {
    const uuid = uuidv4()
    const now = new Date()

    ;(async () => {
      const fixtures = await get_fixtures({ id_type: 'FixturesQrId', id: qrId })
      if (fixtures == 'auth') {
        toast.error('認証')
      } else if (fixtures == 'env' || fixtures == 'notfound' || fixtures == 'server') {
        toast.error('物品が存在しません')
      } else {
        const lending: Lending = {
          id: uuid,
          fixtures_id: fixtures.id,
          fixtures_qr_id: qrId,
          spot_name: spotName,
          lending_at: now,
          returned_at: null,
          borrower_name: borrowerName,
          borrower_number: Number(borrowerNumber),
          borrwer_org: borrowerOrg == '' ? null : borrowerOrg,
        }
        const res = await insert_lending(lending)
        if (res == 'auth') {
          toast.error('認証')
        } else if (res == 'env' || res == 'notfound' || res == 'server') {
          toast.error('貸出に失敗しました')
        } else {
          toast.success('貸出に成功しました')
          // 初期化
          setQrId('')
          setSpotName('')
          setBorrowerName('')
          setBorrowerNumber('')
          setBorrowerOrg('')
          setIsLending(true)
        }
      }
    })()
  }

  const onClickReturnedButton = (): void => {
    ;(async () => {
      const res = await returned_lending({ id_type: 'FixturesQrId', id: qrId })
      if (res == 'auth') {
        toast.error('認証')
      } else if (res == 'env' || res == 'notfound' || res == 'server') {
        toast.error('返却に失敗しました')
      } else {
        toast.success('返却に成功しました')
        // 初期化
        setQrId('')
        setSpotName('')
        setBorrowerName('')
        setBorrowerNumber('')
        setBorrowerOrg('')
        setIsLending(true)
      }
    })()
  }

  return (
    <>
      <StyledMain>
        {isLending ? (
          <>
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
            <h1>貸出・返却</h1>
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
            <div>
              <TextInput
                label='貸出物品又は返却物品のID'
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
              <SystemButton onClick={onClickRegisterButton} disabled={validButton()} text='貸出' />
            </div>
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
