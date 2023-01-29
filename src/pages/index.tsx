import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react"
import QR from 'components/QR'

export default function Home() {
  const [uuid, setUuid] = useState("")

  const genUuid = () => {
    setUuid(uuidv4())
  }

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
        { uuid !== "" && <QR uuid={uuid} /> }
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
