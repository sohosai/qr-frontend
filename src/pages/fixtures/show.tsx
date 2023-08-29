import { Fixtures } from '../../types'
import { initQRCode, QrColor2QRCodeColor } from '@/lib/QRCode'
import QRCode from '../../components/QRCode'

type FixturesProps = {
  fixtures: Fixtures
}

const FixturesShow = ({ fixtures }: FixturesProps) => {
  if (typeof fixtures !== 'undefined') {
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
  }
}

export default FixturesShow
