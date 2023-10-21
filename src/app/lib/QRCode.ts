import { QRCodeColor, qrcolor2string, qrcolor2code, QRCodeColors } from '@/app/types'

export type QRCodeObject = {
  id: string
  color: QRCodeColor
  color_hex: string
  color_kanji: string
}

const Base32 = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

const sampleString = (str: string): string => {
  console.log(Base32.length)
  return str[Math.floor(Math.random() * str.length)]
}

const sampleArray = <T>(arr: Readonly<Array<T>>): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const genQRCodeID = (): string => {
  let id = ''
  for (let i = 0; i < 4; i++) {
    id += sampleString(Base32)
  }
  return id
}

export const initQRCode = (
  id: string = genQRCodeID(),
  color: QRCodeColor = sampleArray(Object.keys(QRCodeColors)) as QRCodeColor,
): QRCodeObject => {
  return {
    id,
    color,
    color_hex: qrcolor2code(color),
    color_kanji: qrcolor2string(color),
  }
}

const QRCodeData: { id: string; color: QRCodeColor }[] = [
  { id: 'ab23c', color: 'red' },
  { id: 'de34f', color: 'blue' },
  { id: 'gh56i', color: 'green' },
  { id: 'jk78l', color: 'orange' },
  { id: 'mn90o', color: 'pink' },
  { id: 'pq12r', color: 'purple' },
  { id: 'st34u', color: 'light_blue' },
  { id: 'vw56x', color: 'yellow' },
  { id: 'yz78a', color: 'brown' },
]

export const QRCodeList: QRCodeObject[] = QRCodeData.map((qr) => {
  return initQRCode(qr.id, qr.color)
})
