import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import axios from 'axios'
import { Spot } from '@/types'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import SpotList from '@/components/SpotList'
import Head from 'next/head'
import { get_spot_list } from '@/lib/api'
import AuthDialog from '@/components/AuthDialog'

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
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
  .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root {
    margin-top: 0px;
  }
  .css-518kzi-MuiListItemSecondaryAction-root {
    margin: 0px;
  }
  .SpotList__StyledSpotList-sc-e5cfe57d-0 {
    padding: 0px;
  }
`

const SpotListShow = () => {
  const [spotList, setSpotList] = useState<Spot[]>([])
  const [envCheck, setEnvCheck] = useState(false)

  const [authOpen, setAuthOpen] = useState(false)
  const handleAuthDialogClose = (): void => {
    setAuthOpen(false)
  }

  useEffect(() => {
    ;(async () => {
      const spot_list = await get_spot_list()
      if (spot_list == 'auth') {
        setAuthOpen(true)
      } else if (
        spot_list == 'env' ||
        spot_list == 'notfound' ||
        spot_list == 'server' ||
        spot_list == 'void'
      ) {
        toast.error('場所情報のリストの取得に失敗しました')
        setEnvCheck(!envCheck)
      } else {
        setSpotList(spot_list)
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
        <AuthDialog is_open={authOpen} handleClose={handleAuthDialogClose} />
      </StyledMain>
    </>
  )
}

export default SpotListShow
