import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import CssBaseline from '@mui/material/CssBaseline'

import TextInput from '@/components/TextInput'
import Item from '@/components/Item'
import Button from '@/components/Button'
import Select from '@/components/Select'
import Header from '@/components/Header'
import { Area, Spot } from '@/types'
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
 * 場所情報を編集
 */
const SpotEdit = () => {
  const route = useRouter()

  const [spotName, setSpotName] = useState('')

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

  useEffect(() => {
    if (typeof route.query.name !== 'string') return

    const spot_name = route.query.spot_name
    const api_url = process.env.NEXT_PUBLIC_QR_API_URL
    if (api_url) {
      ;(async () => {
        const url_spot = api_url + '/get_spot?name=' + spot_name
        try {
          const response_spot = await axios.get(url_spot)
          const spot_data: Spot = response_spot.data
          setSpotName(spot_data.name)
          spot_data.area == 'area1'
            ? '第一エリア'
            : areaName == 'area2'
            ? '第二エリア'
            : areaName == 'area3'
            ? '第三エリア'
            : areaName == 'center_library'
            ? '中央図書館'
            : areaName == 'ishi_square'
            ? '石の広場'
            : areaName == 'igaku'
            ? '医学エリア'
            : areaName == 'taigei'
            ? '体育芸術エリア'
            : areaName == 'kasuga'
            ? '春日エリア'
            : areaName == 'ichinoya'
            ? '一の矢'
            : areaName == 'hirasuna'
            ? '平砂'
            : '追越'
          spot_data.building ? setBuilding(spot_data.building) : setBuilding('')
          spot_data.floor ? setFloor(spot_data.floor.toString()) : setFloor('')
          spot_data.room ? setRoom(spot_data.room) : setRoom('')
        } catch (err) {
          toast.error('場所情報の取得に失敗')
        }
      })()
    } else {
    }
  }, [route])

  const validButton = (): boolean => {
    return spotName == '' || areaName == '未選択'
  }

  const onClickRegisterButton = (): void => {
    const area: Area =
      areaName == '第一エリア'
        ? 'area1'
        : areaName == '第二エリア'
        ? 'area2'
        : areaName == '第三エリア'
        ? 'area3'
        : areaName == '中央図書館'
        ? 'center_library'
        : areaName == '石の広場'
        ? 'ishi_square'
        : areaName == '医学エリア'
        ? 'igaku'
        : areaName == '体育芸術エリア'
        ? 'taigei'
        : areaName == '春日エリア'
        ? 'kasuga'
        : areaName == '一の矢'
        ? 'ichinoya'
        : areaName == '平砂'
        ? 'hirasuna'
        : 'oikoshi'

    const json: Spot = {
      name: spotName,
      area: area,
      building: building == '' ? null : building,
      floor: floor == '' ? null : Number(floor),
      room: room == '' ? null : room,
    }

    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url !== undefined) {
        const url = api_url + '/insert_spot'
        try {
          const result = await axios.post(url, json)
          toast.success('地点の登録に成功')
          return result
        } catch (err) {
          toast.error('地点の登録に失敗')
        }
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
      <Header />
      <CssBaseline />
      <Head>
        <title>地点情報の登録 | QR</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <StyledMain>
        <h1>地点情報の登録</h1>
        <div className='SpotNameInput'>
          <Item label='地点の名称' value={spotName} />
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
              '医学エリア',
              '体育芸術エリア',
              '春日エリア',
              '一の矢',
              '平砂',
              '追越',
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

        <div className='SpotRegisterButton'>
          <Button onClick={onClickRegisterButton} disabled={validButton()} text='登録' />
        </div>
      </StyledMain>
    </>
  )
}

export default SpotEdit