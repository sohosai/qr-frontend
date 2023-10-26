import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
  font-weight: 700;
  h1 {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 30px;
    font-size: 16px;
  }
  div {
    margin-top:10px
    margin-bottom: 10px;
  }
  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
  p {
    padding-right: 15px;
    padding-left: 15px;
  }
`

const LendingListShow = () => {
  const router = useRouter()
  const [lendingList, setLendingList] = useState<Lending[]>([])

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
          toast.error('貸出中の物品のリストの取得に失敗しました')
          setLendingList([])
        }
      } else {
      }
    })()
  }, [router])

  return (
    <>
      <StyledMain>
        <h1>貸出中の物品の一覧</h1>
        {lendingList.length == 0 ? (
          <p>貸出中の物品はありません</p>
        ) : (
          <LendingList lending_list={lendingList} />
        )}
      </StyledMain>
    </>
  )
}

export default LendingListShow
