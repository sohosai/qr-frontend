import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import CssBaseline from '@mui/material/CssBaseline'

import TextInput from '@/components/TextInput'
import SystemButton from '@/components/SystemButton'
import Header from '@/components/Header'
import FixturesList from '@/components/FixturesList'
import { Fixtures, SearchFixtures } from '@/types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'

const StyledMain = styled.main.withConfig({
  displayName: 'StyledMain',
})`
  position: static;
  font-weight: 700;
  h1 {
    margin-top: 15px;
    margin-bottom: 15px;
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
    margin-bottom: 18px;
  }
  .FixturesList__StyledFixturesList-sc-8098f719-0 {
    padding: 0px;
  }
`

/**
 * 物品を検索する
 */
const FixturesSearch = () => {
  const [searchWords, setSearchWords] = useState('')
  const onChangeSearchWords = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchWords(event.target.value)
  }

  const [fixturesList, setFixturesList] = useState<Fixtures[]>([])

  const validButton = (): boolean => {
    return searchWords == ''
  }

  const onClickSearchButton = (): void => {
    const words = searchWords
    // リストだと並列検索になる
    // そのまま空白区切りとかで渡すとmeilisearch側で上手くやってくれる
    //.split(' ')
    //.map((s) => s.trim())
    //.join(',')

    ;(async () => {
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (api_url) {
        const url = api_url + '/search_fixtures?keywords=' + words
        try {
          const result = await axios.get(url)
          const search_data_list: SearchFixtures[] = result.data
          const fixtures_list = search_data_list
            .sort((a, b) => {
              const a_r = a.ranking
              const b_r = b.ranking
              if (a_r) {
                if (b_r) {
                  return b_r - a_r
                } else {
                  return 1
                }
              } else {
                if (b_r) {
                  return -1
                } else {
                  return 0
                }
              }
            })
            .map((s) => s.data)
          setFixturesList(fixtures_list)
          return result
        } catch (err) {
          toast.error('検索に失敗')
        }
      }
    })()
  }

  return (
    <>
      <StyledMain>
        <Box sx={{ ml: '30px', mr: '30px' }}>
          <h1>物品の検索</h1>
          <div className='SearchWordsInput'>
            <TextInput
              label='検索単語'
              required={true}
              placeholder='三脚 袋'
              value={searchWords}
              onChange={onChangeSearchWords}
            />
            <div className='FixturesSearchButton'>
              <SystemButton onClick={onClickSearchButton} disabled={validButton()} text='検索' />
            </div>
          </div>
        </Box>
        <FixturesList fixtures_list={fixturesList}></FixturesList>
      </StyledMain>
    </>
  )
}

export default FixturesSearch
