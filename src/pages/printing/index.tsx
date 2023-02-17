import Head from "next/head"

import usePdf from "@/hooks/usePdf"
import QRListPdf from "components/QRListPdf"
import { genQRCodeID, QRCodeID } from "@/utils/qrid"
import { useState } from "react"

export default function Printing() {
    const { targetRef, pdfHandler } = usePdf()
    const onClickResetUuid = (): void => {
        let qrids = []
        for (let _ = 0; _ < 54; _++) {
            qrids.push(genQRCodeID())
        }
        setQRIDs(qrids)
    }
    const [qrids, setQRIDs] = useState<QRCodeID[]>([])

    const onClickDownloadPdf = (): void => {
        pdfHandler({ name: 'test' })
    }
    
    return (
        <>
            <Head>
                <title>印刷する | QR</title>
                <meta name="description" content="物品管理" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>QRコードを印刷する</h1>
                <p>未印刷のQRコードをまとめて印刷することができます</p>
                <div>
                    <button
                        onClick={onClickResetUuid}
                    >QRIDを初期化する</button>
                </div>
                <hr />
                <QRListPdf
                    ref={targetRef}
                    qrids={qrids}
                />
                <button
                    disabled={qrids.length === 0}
                    onClick={onClickDownloadPdf}
                >ダウンロードする</button>
            </main>
        </>
    )
}