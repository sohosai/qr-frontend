import { ThemeProvider, createTheme } from '@mui/system'

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

/**
 * 貸出情報を表すデータ
 * qr-backendのlib.rsファイルに定義されている型を参考にするとよい
 */

export type Lending = {
  id: string
  fixtures_id: string
  spot_name: string
  lending_at: Date
  returned_at: Date | null
  borrower_name: string
  borrower_number: number
  borrwer_org: string | null
}

/**
 * 学内の大まかな範囲
 * lib.rsを参照
 */
export type Area =
  | 'area1'
  | 'area2'
  | 'area3'
  | 'center_library'
  | 'ishi_square'
  | 'igaku'
  | 'taigei'
  | 'kasuga'
  | 'ichinoya'
  | 'hirasuna'
  | 'oikoshi'

/**
 * 貸し出し物品を持っていく地点の情報
 * lib.rs参照
 */
export type Spot = {
  name: string
  area: Area
  building: string | null
  floor: number | null
  room: string | null
}
