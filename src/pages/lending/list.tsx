import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import axios from 'axios'
import { Lending } from '@/types'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import LendingList from '@/components/LendingList'
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

const LendingListShow = () => {
  const [lendingList, setLendingList] = useState<Lending[]>([])
  const [envCheck, setEnvCheck] = useState(false)

  useEffect(() => {
    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url) {
        try {
          const get_lending_list_url = api_url + '/get_lending_list'
          const get_lending_list_result = await axios.get(get_lending_list_url)
          const lending_list: Lending[] = get_lending_list_result.data
          setLendingList(lending_list)
          console.log(lendingList)
        } catch (err) {
          toast.error('貸し出し中の物品のリストの取得に失敗しました')
          setLendingList([])
          setEnvCheck(!envCheck)
        }
      } else {
        setEnvCheck(!envCheck)
      }
    })()
  }, [envCheck])

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
        {lendingList.length == 0 ? (
          <>貸し出し中の物品はありません</>
        ) : (
          <LendingList lending_list={lendingList} />
        )}
      </StyledMain>
    </>
  )
}

export default LendingListShow
