/**
 * QRコードに振られた色を表す
 */
export type QrColor =
  | 'red'
  | 'orange'
  | 'brown'
  | 'light_blue'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'pink'

export type Stroge = 'room101' | 'room102' | 'room206'

/**
 * 物品情報を表すデータ
 * qr-backendのlib.rsファイルに定義されている型を参考にすると良い
 */
export type Fixtures = {
  id: string
  qr_id: string
  qr_color: QrColor
  name: string
  description: string | null
  model_number: string | null
  storage: Stroge
  usage: string | null
  usage_season: string | null
  note: string
  parent_id: string
}
