import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react"
import { useQRCode } from 'next-qrcode'

export default function Home() {
  const [uuid, setUuid] = useState("")

  const genUuid = () => {
    setUuid(uuidv4())
  }

  const { Canvas } = useQRCode();

  return (
    <div>
      <Head>
        <title>kaniQR</title>
        <meta name="description" content="ｶﾆﾁｬﾝ!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>kaniQR</h1>
        <h2>物品の登録</h2>
        <p>uuid: { uuid }</p>
        { uuid !== "" &&
          <div>
            <Canvas
              text={uuid}
              options={{
                type: 'image/jpeg',
                quality: 0.3,
                level: 'M',
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: '#010599FF',
                  light: '#FFBF60FF',
                },
              }}
            />
         </div>
        }
        <div>
          <label>格納場所: </label>
          <select>
            <option>未決定</option>
            <option>図書館下</option>
          </select>
        </div>
        <button onClick={genUuid}>登録</button>
      </main>
    </div>
  )
}
