import { QRCodeObject } from '../../lib/QRCode'
import { useQRCode } from 'next-qrcode'
import ReactJSBarcode from 'react-jsbarcode'

type QRCodeProp = {
  /**
   * 表示するQRCodeを設定します
   */
  qr: QRCodeObject
  isQr: boolean
}

/**
 * 印刷時に表示するQRコードを生成・描画するコンポーネント
 */
const QRCode = ({ qr, isQr }: QRCodeProp) => {
  const { Canvas } = useQRCode()
  const url = `https://qr.sohosai.com/items/${qr.id}`
  return (
    <>
      {isQr ? (
        <div
          style={{
            display: 'flex',
            width: '200px',
            height: '200px',
            margin: '20px',
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
      ) : (
        <div
          style={{
            display: 'flex',
            width: '330px',
            height: '100px',
            margin: '20px',
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
              flex: '2',
            }}
          />
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'end',
              marginBottom: '16px',
              flex: '1',
            }}
          >
            {qr.color_kanji}
          </div>
          <div
            style={{
              flex: '5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ReactJSBarcode
              value={qr.id}
              options={{
                format: 'code128',
                height: 50,
                fontSize: 18,
                marginTop: 0,
                marginBottom: 0,
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default QRCode
