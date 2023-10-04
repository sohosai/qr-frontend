import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import Button from '@/components/Button'
import TextInput from '@/components/TextInput'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import IconButton from '@mui/material/IconButton'
import QrCodeReader from '@/components/QRCodeReader'
import Header from '@/components/Header'
import FixturesList from '@/components/FixturesList'
import axios from 'axios'
import { Fixtures, Lending, Spot } from '@/types'
import { toast } from 'react-toastify'
import Select from '@/components/Select'
import styled from 'styled-components'
import Head from 'next/head'

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

const FixturesLending = () => {
  const [lendingList, setLendingList] = useState<Fixtures[]>([])

  ;(async () => {
    const api_url = process.env.NEXT_PUBLIC_QR_API_URL
    if (api_url !== undefined) {
      try {
        const get_lending_list_url = api_url + '/get_lending_list'
        const get_lending_list_result = await axios.get(get_lending_list_url)
        const lending_list: Fixtures[] = get_lending_list_result.data
        setLendingList(lending_list)
      } catch (err) {
        toast.error('貸し出し中の物品のリストの取得に失敗しました')
      }
    }
  })()

  return (
    <>
      <Header />
      <Head>
        <title>貸し出し中の物品の一覧取得 | QR</title>
        <meta name='description' content='物品管理' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledMain>
        <h1>貸し出し中の物品の一覧</h1>
        <FixturesList fixtures_list={lendingList}></FixturesList>
      </StyledMain>
    </>
  )
}

export default FixturesLending
