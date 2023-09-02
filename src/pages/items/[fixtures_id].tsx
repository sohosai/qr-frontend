import { Fixtures } from '@/types'
import { useRouter } from 'next/router'
import { initQRCode, QrColor2QRCodeColor } from '@/lib/QRCode'
import QRCode from '@/components/QRCode'

const FixturesShow = () => {
  const route = useRouter()
  const fixtures_id = route.query.fixtures_id
  if (typeof fixtures_id == 'string') {
    // ダミー値
    // 本来はバックエンドのAPIを叩いて取得する
    const fixtures: Fixtures = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      qr_id: fixtures_id,
      qr_color: 'red',
      name: 'test',
      description: 'test用のダミー',
      note: '',
      parent_id: 'xxxx',
      model_number: null,
      storage: 'room101',
      usage: null,
      usage_season: null,
    }
    return (
      <>
        <p>{fixtures.name}</p>
        {fixtures.model_number !== null ? <p>{fixtures.model_number}</p> : <></>}
        <p>uuid: {fixtures.id}</p>
        <QRCode qr={initQRCode(fixtures.qr_id, QrColor2QRCodeColor(fixtures.qr_color))}></QRCode>
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
    )
  } else {
    return <></>
  }
}

export default FixturesShow
