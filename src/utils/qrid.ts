const QRCodeColors = ['Red', 'Blue', 'Green', 'Orange', 'Purple', 'Cyan', 'Pink'] as const
type QRCodeColor = typeof QRCodeColors[number]

export type QRCodeID = {
    id: string
    color: QRCodeColor
}

const Base36 = "1234567890abcdefghijkmnopqrstuvwxyz"

const sampleString = (str: string): string => {
    console.log(Base36.length)
    return str[Math.floor(Math.random() * str.length)]
}

const sampleArray = <T> (arr: Readonly<Array<T>>): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}

export const toColorCode = (color: QRCodeColor): string => {
    switch (color) {
        case 'Red':
            return '#ff4b00'
        case 'Blue':
            return '#005aff'
        case 'Green':
            return '#03af7a'
        case 'Orange':
            return '#f6aa00'
        case 'Purple':
            return '#990099'
        case 'Cyan':
            return '#4dc4ff'
        case 'Pink':
            return '#ff8082'
    }
}

export const genQRCodeID = (): QRCodeID => {
    let id = ""
    for (let i = 0; i < 5; i++) {
        id += sampleString(Base36)
    }
    const color = sampleArray(QRCodeColors)
    return {
        id,
        color
    }
}
