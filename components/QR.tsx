import { QRCodeID, toColorCode } from '@/utils/qrid';
import { useQRCode } from 'next-qrcode'

type QRProp = {
  qrid: QRCodeID
}

export default function QR ({ qrid }: QRProp) {
  const { Canvas } = useQRCode();
  const url = `https://qr.sohosai.com/fixtures/${qrid.id}`
  return (
    <div style={{
      display: 'flex',
      flexFlow: 'column',
      width: '230px',
      margin: '10px',
      padding: '10px 0',
      justifyContent: 'center',
      alignItems: 'center',
      border: '3px solid black'
    }}>
      <div>
        <Canvas
          text={url}
          options={{
            type: 'image/jpeg',
            quality: 0.3,
            level: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: toColorCode(qrid.color),
              light: '#fff',
            },
          }}
        />
      </div>
      <div style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}>
        { qrid.id }
      </div>
    </div>
  );
}
