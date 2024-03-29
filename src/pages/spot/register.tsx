import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'

import TextInput from '@/components/TextInput'
import SystemButton from '@/components/SystemButton'
import TextArea from '@/components/TextArea'
import Select from '@/components/Select'
import { Area, Spot, string2area } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { insert_spot } from '@/lib/api'
import router from 'next/router'
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
const SpotRegister = () => {
  const [authOpen, setAuthOpen] = useState(false)
  const handleAuthDialogClose = (): void => {
    setAuthOpen(false)
  }

  const [spotName, setSpotName] = useState('')
  const onChangeSpotName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSpotName(event.target.value)
  }

  const [areaName, setAreaName] = useState('未選択')
  const onChangeAreaName = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setAreaName(event.target.value)
  }

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

  const validButton = (): boolean => {
    return spotName == '' || areaName == '未選択'
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
      const res = await insert_spot(json)
      if (res == 'auth') {
        setAuthOpen(true)
      } else if (res == 'env' || res == 'notfound' || res == 'server') {
        toast.error('地点の登録に失敗')
        //登録情報を地点情報一覧に反映するために必要
        router.reload()
        router.replace('/spot')
      } else {
        toast.success('地点の登録に成功')
        //登録情報を地点情報一覧に反映するために必要
        router.reload()
        router.replace('/spot')
      }
    })()

    setSpotName('')
    setAreaName('未選択')
    setBuilding('')
    setFloor('')
    setRoom('')
  }
  return (
    <>
      <StyledMain>
        <h1>地点情報の登録</h1>
        <div className='SpotNameInput'>
          <TextInput
            label='地点の名称'
            required={true}
            placeholder='coinsラウンジ'
            value={spotName}
            onChange={onChangeSpotName}
          />
        </div>
        <div className='AreaSelect'>
          <Select
            label='エリア'
            required={true}
            initial='未選択'
            options={[
              '未選択',
              '第一エリア',
              '第二エリア',
              '第三エリア',
              '中央図書館',
              '石の広場',
              '大学会館',
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
            placeholder='ものを置く場所'
            text={note}
            onChange={onChangeNote}
          />
        </div>

        <div className='SpotRegisterButton'>
          <SystemButton onClick={onClickRegisterButton} disabled={validButton()} text='登録' />
        </div>
        <AuthDialog is_open={authOpen} handleClose={handleAuthDialogClose} />
      </StyledMain>
    </>
  )
}

export default SpotRegister
