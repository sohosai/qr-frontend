import { QRCodeObject } from '../../lib/QRCode';
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
  const { Canvas } = useQRCode();
  const url = `https://qr.sohosai.com/fixtures/${qr.id}`
  return (
    <div style={{
      display: 'flex',
      flexFlow: 'column',
      width: '150px',
      height: '220px',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '3px solid black',
      backgroundColor: 'white'
    }}>
      <div style={{
        marginTop: '10px'
      }}>
        <Canvas
          text={url}
          options={{
            type: 'image/jpeg',
            quality: 0.3,
            level: 'M',
            margin: 3,
            scale: 4,
            width: 100,
            color: {
              dark: '#000000',
              light: '#ffffff'
            },
          }}
        />
      </div>
      <div style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: '200',
        fontSize: '32px',
      }}>
        { qr.id }
      </div>
      <div style={{
        marginTop: '20px',
        backgroundColor: qr.color_hex,
        height: '45px',
        width: '100%'
      }} />
    </div>
  );
}

export default QRCode
