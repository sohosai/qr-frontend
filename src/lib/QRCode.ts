import { QrColor } from '@/types'

export const QRCodeColors = {
  Red: '#ff4b00',
  Blue: '#005aff',
  Green: '#03af7a',
  Orange: '#f6aa00',
  Purple: '#990099',
  Cyan: '#4dc4ff',
  Pink: '#ff8082',
  Yellow: '#fff100',
  Brown: '#804000',
}
const QRCodeColorsToKanji = {
  Red: '赤',
  Blue: '青',
  Green: '緑',
  Orange: '橙',
  Purple: '紫',
  Cyan: '水',
  Pink: '桃',
  Yellow: '黄',
  Brown: '茶',
}
export type QRCodeColor = keyof typeof QRCodeColors
export const QrColor2QRCodeColor = (color: QrColor): QRCodeColor => {
  switch (color) {
    case 'red':
      return 'Red'
    case 'blue':
      return 'Blue'
    case 'green':
      return 'Green'
    case 'orange':
      return 'Orange'
    case 'purple':
      return 'Purple'
    case 'light_blue':
      return 'Cyan'
    case 'pink':
      return 'Pink'
    case 'yellow':
      return 'Yellow'
    case 'brown':
      return 'Brown'
  }
}

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
    color_hex: QRCodeColors[color],
    color_kanji: QRCodeColorsToKanji[color],
  }
}

const QRCodeData: { id: string; color: QRCodeColor }[] = [
  { id: 'ab23c', color: 'Red' },
  { id: 'de34f', color: 'Blue' },
  { id: 'gh56i', color: 'Green' },
  { id: 'jk78l', color: 'Orange' },
  { id: 'mn90o', color: 'Pink' },
  { id: 'pq12r', color: 'Purple' },
  { id: 'st34u', color: 'Cyan' },
  { id: 'vw56x', color: 'Yellow' },
  { id: 'yz78a', color: 'Brown' },
]

export const QRCodeList: QRCodeObject[] = QRCodeData.map((qr) => {
  return initQRCode(qr.id, qr.color)
})
