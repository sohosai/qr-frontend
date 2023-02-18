import { useQRCode } from 'next-qrcode'

type QRCodeProp = {
  /**
   * QRCodeに持たせるUUIDを設定します
   */
  uuid: string
}

/**
 * 印刷時に表示するQRコードを生成・描画するコンポーネント
 */
const QRCode = ({ uuid }: QRCodeProp) => {
  const { Canvas } = useQRCode();
  return (
    <div>
      <Canvas
        text={uuid}
        options={{
          type: 'image/jpeg',
          quality: 0.3,
          level: 'M',
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#000',
            light: '#fff',
          },
        }}
      />
    </div>
  );
}

export default QRCode
