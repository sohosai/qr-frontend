import { forwardRef, ComponentPropsWithoutRef } from 'react'
import { QRCodeObject } from '../../lib/QRCode'
import QRCode from '../QRCode'

type QRListPdfProps = {
  /**
   * 未印刷のQRコードのデータを設定します
   */
  qrs: QRCodeObject[]
}
type ChildProps = ComponentPropsWithoutRef<'div'> & QRListPdfProps

/**
 * QRコードをPDFに変換して印刷するためのコンポーネント
 */
const QRListPdf = forwardRef<HTMLDivElement, ChildProps>(({ qrs }, ref) => {
  return (
    <div
      id='qr-list-pdf'
      ref={ref}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {qrs.map((qr) => {
        return (
          <div style={{ margin: 'auto' }} key={qr.id}>
            <QRCode qr={qr} />
          </div>
        )
      })}
    </div>
  )
})

QRListPdf.displayName = 'QRListPdf'

export default QRListPdf
