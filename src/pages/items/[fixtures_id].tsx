import { useEffect, useState } from 'react'
import { Fixtures } from '@/types'
import { useRouter } from 'next/router'
import { initQRCode } from '@/lib/QRCode'
import QRCode from '@/components/QRCode'
import Header from '@/components/Header'
import Item from '@/components/Item'
import { toast } from 'react-toastify'
import axios from 'axios'

const FixturesShow = () => {
  const route = useRouter()
  const [fixtures, setFixtures] = useState<Fixtures | null>(null)
  const [isOk, setIsOk] = useState(false)

  useEffect(() => {
    if (typeof route.query.fixtures_id == 'string') {
      const fixtures_id = route.query.fixtures_id
      const api_url = process.env.NEXT_PUBLIC_QR_API_URL
      if (fixtures_id !== null && api_url !== undefined) {
        ;(async () => {
          const url = api_url + '/get_fixtures?qr_id=' + fixtures_id
          setIsOk(true)
          try {
            const response = await axios.get(url)
            setFixtures(response.data.results)
            return response
          } catch (err) {
            toast.error('URLが無効なため表示に失敗')
            setFixtures(null)
          }
        })()
      } else {
        setIsOk(false)
      }
    }
  }, [route])

  if (isOk) {
    return (
      <>
        <Header />
        {fixtures !== null ? (
          <>
            <p>{fixtures.name}</p>
            {fixtures.model_number !== null ? <p>{fixtures.model_number}</p> : <></>}
            <Item label='uuid' value={fixtures.id} />
            <QRCode qr={initQRCode(fixtures.qr_id, fixtures.qr_color)}></QRCode>
            <Item label='保管場所' value={fixtures.storage + '/' + fixtures.parent_id} />
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
          <></>
        )}
      </>
    )
  } else {
    return (
      <>
        <Header />
      </>
    )
  }
}

export default FixturesShow
