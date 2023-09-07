/**
 * QRコードに振られた色を表す
 */

export const QRCodeColors = {
  red: '#ff4b00',
  blue: '#005aff',
  green: '#03af7a',
  orange: '#f6aa00',
  purple: '#990099',
  light_blue: '#4dc4ff',
  pink: '#ff8082',
  yellow: '#fff100',
  brown: '#804000',
}

export const QRCodeColorsToKanji = {
  red: '赤',
  blue: '青',
  green: '緑',
  orange: '橙',
  purple: '紫',
  light_blue: '水',
  pink: '桃',
  yellow: '黄',
  brown: '茶',
}

export type QRCodeColor = keyof typeof QRCodeColors

export type Storage = 'room101' | 'room102' | 'room206'

/**
 * 物品情報を表すデータ
 * qr-backendのlib.rsファイルに定義されている型を参考にすると良い
 */
export type Fixtures = {
  id: string
  created_at: Date
  qr_id: string
  qr_color: QRCodeColor
  name: string
  description: string | null
  model_number: string | null
  storage: Storage
  usage: string | null
  usage_season: string | null
  note: string
  parent_id: string
}
