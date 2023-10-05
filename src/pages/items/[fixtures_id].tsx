import { useEffect, useState } from 'react'
import { Fixtures, Lending } from '@/types'
import { useRouter } from 'next/router'
import { initQRCode } from '@/lib/QRCode'
import QRCode from '@/components/QRCode'
import Header from '@/components/Header'
import Item from '@/components/Item'
import { toast } from 'react-toastify'
import axios from 'axios'
import styled from 'styled-components'

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
`

const FixturesShow = () => {
  const route = useRouter()
  const [fixtures, setFixtures] = useState<Fixtures | null>(null)
  const [lending, setLending] = useState<Lending | null>(null)
  const [queried, setQueried] = useState(false)

  useEffect(() => {
    if (typeof route.query.fixtures_id !== 'string') return

    const fixtures_id = route.query.fixtures_id
    const api_url = process.env.NEXT_PUBLIC_QR_API_URL
    if (fixtures_id !== null && api_url !== undefined) {
      console.log('called')
      ;(async () => {
        const url_fixtures = api_url + '/get_fixtures?qr_id=' + fixtures_id
        const url_lending = api_url + '/get_lending?qr_id=' + fixtures_id
        console.log({ url_fixtures })
        setQueried(true)
        try {
          const response_fixtures = await axios.get(url_fixtures)
          setFixtures(response_fixtures.data)
          const response_lending = await axios.get(url_lending)
          setLending(response_lending.data)
        } catch (err) {
          toast.error('URLが無効なため表示に失敗')
          setFixtures(null)
        }
      })()
    } else {
      setQueried(false)
    }
  }, [route])

  if (queried) {
    return (
      <>
        <Header />
        <StyledMain>
          {fixtures ? (
            <>
              <h1>{fixtures.name}</h1>
              {fixtures.model_number !== null ? <p>{fixtures.model_number}</p> : <></>}
              <Item label='uuid' value={fixtures.id} />
              <QRCode qr={initQRCode(fixtures.qr_id, fixtures.qr_color)}></QRCode>
              <Item label='保管場所' value={fixtures.storage + '/' + fixtures.parent_id} />
              {lending ? (
                <>
                  <Item label='現在位置（貸出）' value={lending.spot_name} />
                </>
              ) : (
                <></>
              )}
              {fixtures.description == null ? (
                <></>
              ) : (
                <Item label='description' value={fixtures.description} />
              )}
              {fixtures.note == null ? <></> : <Item label='note' value={fixtures.note} />}
              {fixtures.usage !== null ? <Item label='用途' value={fixtures.usage} /> : <></>}
              {fixtures.usage_season !== null ? (
                <Item label='使用時期' value={fixtures.usage_season} />
              ) : (
                <></>
              )}
            </>
          ) : (
            <>fixturesがnull or undefined</>
          )}
        </StyledMain>
      </>
    )
  } else {
    return (
      <>
        <Header />
        <p>クエリが存在しない</p>
      </>
    )
  }
}

export default FixturesShow
