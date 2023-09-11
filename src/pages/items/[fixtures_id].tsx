import { useEffect, useState } from 'react'
import { Fixtures } from '@/types'
import { useRouter } from 'next/router'
import { initQRCode } from '@/lib/QRCode'
import QRCode from '@/components/QRCode'
import Header from '@/components/Header'
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
          console.log('url:')
          console.log(url)
          setIsOk(true)
          try {
            const response = await axios.get(url)
            setFixtures(response.data.results)
            return response
          } catch (err) {
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
            <p>uuid: {fixtures.id}</p>
            <QRCode qr={initQRCode(fixtures.qr_id, fixtures.qr_color)}></QRCode>
            <p>
              保管場所：{fixtures.storage}/{fixtures.parent_id}
            </p>
            <p>description</p>
            {fixtures.description?.split('\n').map((s) => (
              <p key={fixtures.id + 'description' + s}>{s}</p>
            ))}
            <p>note: </p>
            {fixtures.note?.split('\n').map((s) => (
              <p key={fixtures.id + 'note' + s}>{s}</p>
            ))}
            {fixtures.usage !== null ? <p>用途：{fixtures.usage}</p> : <></>}
            {fixtures.usage_season !== null ? <p>使用時期：{fixtures.usage_season}</p> : <></>}
          </>
        ) : (
          <>
            <p>適切なIDではありません</p>
          </>
        )}
      </>
    )
  } else {
    return (
      <>
        <Header />
        <p>API URLが無い、もしくはURLが無効</p>
      </>
    )
  }
}

export default FixturesShow
