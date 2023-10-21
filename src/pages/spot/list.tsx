import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import axios from 'axios'
import { Spot } from '@/types'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import SpotList from '@/components/SpotList'
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

const SpotListShow = () => {
  const [spotList, setSpotList] = useState<Spot[]>([])
  const [envCheck, setEnvCheck] = useState(false)

  useEffect(() => {
    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url) {
        try {
          const get_spot_list_url = api_url + '/get_spot_list'
          const get_spot_list_result = await axios.get(get_spot_list_url)
          const spot_list: Spot[] = get_spot_list_result.data
          setSpotList(spot_list)
        } catch (err) {
          toast.error('場所情報のリストの取得に失敗しました')
          setEnvCheck(!envCheck)
        }
      } else {
        setEnvCheck(!envCheck)
      }
    })()
  }, [envCheck])

  return (
    <>
      <StyledMain>
        <h1>場所情報の一覧</h1>
        {spotList.length == 0 ? (
          <>場所情報は登録されていません</>
        ) : (
          <SpotList spot_list={spotList} />
        )}
      </StyledMain>
    </>
  )
}

export default SpotListShow
