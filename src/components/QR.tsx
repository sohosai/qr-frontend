import { useQRCode } from 'next-qrcode'

type QRProp = {
  uuid: string
}

export default function QR ({ uuid }: QRProp) {
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