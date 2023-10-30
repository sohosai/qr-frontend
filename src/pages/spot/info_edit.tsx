import Head from 'next/head'
import router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import TextInput from '@/components/TextInput'
import Item from '@/components/Item'
import SystemButton from '@/components/SystemButton'
import Select from '@/components/Select'
import Header from '@/components/Header'
import { Area, Spot, area2string, string2area } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import CustomHead from '@/components/CustomHead'
import { get_spot, update_spot } from '@/lib/api'
import AuthDialog from '@/components/AuthDialog'
import TextArea from '@/components/TextArea'

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
 * 場所情報を編集
 */
const SpotEdit = () => {
  const route = useRouter()

  const [authOpen, setAuthOpen] = useState(false)
  const handleAuthDialogClose = (): void => {
    setAuthOpen(false)
  }

  const [spotName, setSpotName] = useState('')

  const [areaName, setAreaName] = useState('')
  const onChangeAreaName = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setAreaName(event.target.value)
  }
  const [initialAreaName, setInitialAreaName] = useState('')

  const [building, setBuilding] = useState('')
  const onChangeBuilding = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setBuilding(event.target.value)
  }

  const [floor, setFloor] = useState('')
  const onChangeFloor = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFloor(event.target.value)
  }

  const [room, setRoom] = useState('')
  const onChangeRoom = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRoom(event.target.value)
  }

  const [note, setNote] = useState('')
  const onChangeNote = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNote(event.target.value)
  }

  useEffect(() => {
    if (typeof route.query.name !== 'string') return

    const spot_name = route.query.name
    if (spot_name) {
      ;(async () => {
        const spot_data = await get_spot(spot_name)
        if (spot_data == 'auth') {
          setAuthOpen(true)
        } else if (
          spot_data == 'env' ||
          spot_data == 'notfound' ||
          spot_data == 'server' ||
          spot_data == 'void'
        ) {
          toast.error('場所情報の取得に失敗')
        } else {
          setSpotName(spot_data.name)
          setAreaName(area2string(spot_data.area))
          setInitialAreaName(area2string(spot_data.area))
          spot_data.building ? setBuilding(spot_data.building) : setBuilding('')
          spot_data.floor ? setFloor(spot_data.floor.toString()) : setFloor('')
          spot_data.room ? setRoom(spot_data.room) : setRoom('')
        }
      })()
    }
  }, [route])

  const validButton = (): boolean => {
    return spotName == '' || areaName == ''
  }

  const onClickRegisterButton = (): void => {
    const area: Area = string2area(areaName)

    const json: Spot = {
      name: spotName,
      area: area,
      building: building == '' ? null : building,
      floor: floor == '' ? null : Number(floor),
      room: room == '' ? null : room,
      note: note == '' ? null : note,
    }

    ;(async () => {
      const res = await update_spot(json)
      if (res == 'auth') {
        setAuthOpen(true)
      } else if (res == 'env' || res == 'notfound' || res == 'server') {
        toast.success('地点情報の編集に失敗')
        //位置情報ページに誘導するために必要
        router.reload()
      } else {
        toast.success('地点情報の編集に成功')
        //位置情報ページに誘導するために必要
        router.replace('/spot')
      }
    })()
  }
  return (
    <>
      <CustomHead />
      <Header />
      <Box sx={{ width: '100%', height: '120px' }}></Box>
      <Box sx={{ width: '100%', maxWidth: '1024px', m: 'auto' }}>
        <StyledMain>
          <h1>地点情報の登録</h1>
          <div className='SpotNameInput'>
            <Item label='地点の名称' value={spotName} />
          </div>
          <div className='AreaSelect'>
            <Select
              label='エリア'
              required={true}
              initial={initialAreaName}
              options={[
                '第一エリア',
                '第二エリア',
                '第三エリア',
                '中央図書館',
                '大学会館',
                '石の広場',
                '医学エリア',
                '体育芸術エリア',
                '春日エリア',
                '一の矢',
                '平砂',
                '追越',
                '移動する人',
              ]}
              onChange={onChangeAreaName}
            />
          </div>
          <div className='BuildingInput'>
            <TextInput
              label='建物名'
              required={false}
              placeholder='3C棟'
              value={building}
              onChange={onChangeBuilding}
            />
          </div>
          <div className='FloorInput'>
            <TextInput
              label='階数'
              required={false}
              placeholder='2'
              value={floor}
              onChange={onChangeFloor}
            />
          </div>
          <div className='RoomInput'>
            <TextInput
              label='部屋番号'
              required={false}
              placeholder='3C213'
              value={room}
              onChange={onChangeRoom}
            />
          </div>
          <div className='NoteInput'>
            <TextArea
              label='備考'
              required={false}
              placeholder='備考'
              text={note}
              onChange={onChangeNote}
            />
          </div>

          <div className='SpotRegisterButton'>
            <SystemButton onClick={onClickRegisterButton} disabled={validButton()} text='更新' />
          </div>

          <AuthDialog is_open={authOpen} handleClose={handleAuthDialogClose} />
        </StyledMain>
      </Box>
    </>
  )
}

export default SpotEdit
