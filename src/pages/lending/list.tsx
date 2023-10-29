import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import axios from 'axios'
import { Lending } from '@/types'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import LendingList from '@/components/LendingList'
import Head from 'next/head'
import { get_lending_list } from '@/lib/api'

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
      const lending_list = await get_lending_list()
      if (lending_list == 'auth') {
        toast.error('認証')
      } else if (lending_list == 'env' || lending_list == 'notfound' || lending_list == 'server') {
        toast.error('貸出中の物品のリストの取得に失敗しました')
        setLendingList([])
      } else {
        setLendingList(lending_list)
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
