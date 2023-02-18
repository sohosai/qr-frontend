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
    LightGreen: '#d8f255'
}
export type QRCodeColor = keyof typeof QRCodeColors

export type QRCodeObject = {
    id: string
    color: QRCodeColor
    color_hex: string
}

const Base36 = "1234567890abcdefghijkmnopqrstuvwxyz"

const sampleString = (str: string): string => {
    console.log(Base36.length)
    return str[Math.floor(Math.random() * str.length)]
}

const sampleArray = <T> (arr: Readonly<Array<T>>): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const genQRCodeID = (): string => {
    let id = ""
    for (let i = 0; i < 5; i++) {
        id += sampleString(Base36)
    }
    return id
}

export const initQRCode = (id: string = genQRCodeID(), color: QRCodeColor = sampleArray(Object.keys(QRCodeColors)) as QRCodeColor): QRCodeObject => {
    return {
        id,
        color,
        color_hex: QRCodeColors[color]
    }
}

const QRCodeData: { id: string, color: QRCodeColor }[] = [
    { id: "ab23c", color: "Red" },
    { id: "de34f", color: "Blue" },
    { id: "gh56i", color: "Green" },
    { id: "jk78l", color: "Orange" },
    { id: "mn90o", color: "Pink" },
    { id: "pq12r", color: "Purple" },
    { id: "st34u", color: "Cyan" },
    { id: "vw56x", color: "Yellow" },
    { id: "yz78a", color: "Brown" },
    { id: "bc90d", color: "LightGreen" }
]

export const QRCodeList: QRCodeObject[] = QRCodeData.map((qr) => {
    return initQRCode(qr.id, qr.color)
})