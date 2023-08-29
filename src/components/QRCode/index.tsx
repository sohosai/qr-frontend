import { QRCodeObject } from '../../lib/QRCode'
import { useQRCode } from 'next-qrcode'

type QRCodeProp = {
  /**
   * 表示するQRCodeを設定します
   */
  qr: QRCodeObject
}

/**
 * 印刷時に表示するQRコードを生成・描画するコンポーネント
 */
const QRCode = ({ qr }: QRCodeProp) => {
  const { Canvas } = useQRCode()
  const url = `https://qr.sohosai.com/items/${qr.id}`
  return (
    <div
      style={{
        display: 'flex',
        width: '200px',
        height: '200px',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '3px solid black',
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          backgroundColor: qr.color_hex,
          height: '100%',
          width: '25%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1',
        }}
      />

      <div
        style={{
          flex: '3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Canvas
          text={url}
          options={{
            type: 'image/jpeg',
            quality: 0.3,
            margin: 3,
            scale: 4,
            width: 100,
            color: {
              dark: '#000000',
              light: '#ffffff',
            },
          }}
        />
        <div
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '32px',
          }}
        >
          {qr.id}
        </div>
        <div
          style={{
            marginTop: '8px',
            fontSize: '18px',
          }}
        >
          {qr.color_kanji}
        </div>
      </div>
    </div>
  )
}

export default QRCode
