/**
 * QRコードに振られた色を表す
 */

import { Exception } from '@zxing/library'
import { float } from '@zxing/library/esm/customTypings'

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

export type QRCodeColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'light_blue'
  | 'pink'
  | 'yellow'
  | 'brown'

export const qrcolor2code = (qrcolor: QRCodeColor): string => {
  switch (qrcolor) {
    case 'red':
      return '#ff4b00'
    case 'blue':
      return '#005aff'
    case 'green':
      return '#03af7a'
    case 'orange':
      return '#f6aa00'
    case 'purple':
      return '#990099'
    case 'light_blue':
      return '#4dc4ff'
    case 'pink':
      return '#ff8082'
    case 'yellow':
      return '#fff100'
    case 'brown':
      return '#804000'
    default:
      throw new Exception('不正なQRCodeColor')
  }
}

export const qrcolor2string = (qrcolor: QRCodeColor): string => {
  switch (qrcolor) {
    case 'red':
      return '赤'
    case 'blue':
      return '青'
    case 'green':
      return '緑'
    case 'orange':
      return '橙'
    case 'purple':
      return '紫'
    case 'light_blue':
      return '水'
    case 'pink':
      return '桃'
    case 'yellow':
      return '黄'
    case 'brown':
      return '茶'
    default:
      throw new Exception('不正なQRCodeColor')
  }
}

export const string2qrcolor = (str: string): QRCodeColor => {
  switch (str) {
    case '赤':
      return 'red'
    case '青':
      return 'blue'
    case '緑':
      return 'green'
    case '橙':
      return 'orange'
    case '紫':
      return 'purple'
    case '水':
      return 'light_blue'
    case '桃':
      return 'pink'
    case '黄':
      return 'yellow'
    case '茶':
      return 'brown'
    default:
      throw new Exception('不正なQRCodeColor')
  }
}

export type Storage = 'room101' | 'room102' | 'room206'

export const storage2string = (storage: Storage): string => {
  switch (storage) {
    case 'room101':
      return '101号室'
    case 'room102':
      return '102号室'
    case 'room206':
      return '206号室'
    default:
      throw new Exception('不正なstorage')
  }
}

export const string2storage = (str: string): Storage => {
  switch (str) {
    case '101号室':
      return 'room101'
    case '102号室':
      return 'room102'
    case '206号室':
      return 'room206'
    default:
      throw new Exception('不正なstorage')
  }
}

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

export type SearchFixtures = {
  data: Fixtures
  ranking: float | null
}

/**
 * 貸出情報を表すデータ
 * qr-backendのlib.rsファイルに定義されている型を参考にするとよい
 */

export type Lending = {
  id: string
  fixtures_id: string
  fixtures_qr_id: string
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
  | 'kaikan'
  | 'igaku'
  | 'taigei'
  | 'kasuga'
  | 'ichinoya'
  | 'hirasuna'
  | 'oikoshi'
  | 'move'

export const area2string = (area: Area): string => {
  switch (area) {
    case 'area1':
      return '第一エリア'
    case 'area2':
      return '第二エリア'
    case 'area3':
      return '第三エリア'
    case 'center_library':
      return '中央図書館'
    case 'ishi_square':
      return '石の広場'
    case 'kaikan':
      return '大学会館'
    case 'igaku':
      return '医学エリア'
    case 'taigei':
      return '体育芸術エリア'
    case 'kasuga':
      return '春日エリア'
    case 'ichinoya':
      return '一の矢'
    case 'hirasuna':
      return '平砂'
    case 'oikoshi':
      return '追越'
    case 'move':
      return '移動する人'
    default:
      throw new Exception('不正なarea')
  }
}

export const string2area = (str: string): Area => {
  switch (str) {
    case '第一エリア':
      return 'area1'
    case '第二エリア':
      return 'area2'
    case '第三エリア':
      return 'area3'
    case '中央図書館':
      return 'center_library'
    case '大学会館':
      return 'kaikan'
    case '石の広場':
      return 'ishi_square'
    case '医学エリア':
      return 'igaku'
    case '体育芸術エリア':
      return 'taigei'
    case '春日エリア':
      return 'kasuga'
    case '一の矢':
      return 'ichinoya'
    case '平砂':
      return 'hirasuna'
    case '追越':
      return 'oikoshi'
    case '移動する人':
      return 'move'
    default:
      throw new Exception('不正なarea')
  }
}

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
