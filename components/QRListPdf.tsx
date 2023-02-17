import { forwardRef, ComponentPropsWithoutRef } from "react"
import QR from "components/QR";
import { QRCodeID } from "@/utils/qrid";

type QRListPdfProps = {
    qrids: QRCodeID[]
}
type ChildProps = ComponentPropsWithoutRef<'div'> & QRListPdfProps;

const QRListPdf = forwardRef<HTMLDivElement, ChildProps>(({ qrids }, ref) => {
    return (
        <div id="qr-list-pdf" ref={ref} style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100vw'
        }}>
            {qrids.map((qrid) => {
                return <QR qrid={qrid} />
            })}
        </div>
    )
})

QRListPdf.displayName = "QRListPdf"

export default QRListPdf
