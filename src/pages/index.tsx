import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useState, useMemo } from "react"
import QR from '@/components/QR'
import { TextArea } from '@/components/TextArea'

export default function Home() {
  const [uuid, setUuid] = useState("")
  const [fixturesName, setFixturesName] = useState("")
  const [fixturesDescription, setFixturesDescription] = useState("")
  const [repository, setRepository] = useState('未選択')
  const [textarea, setTextarea] = useState("")


  const onChangeFixturesName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFixturesName(event.target.value)
  }

  const onChangeFixturesDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFixturesDescription(event.target.value)
  }

  const onChangeRepository = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setRepository(event.target.value)
  }

  const validButton = (): boolean => {
    return fixturesName == '' || fixturesDescription == '' || repository == '未選択'
  }

  const onClickRegisterButton = (): void => {
    const json = {
      uuid,
      name: fixturesName,
      description: fixturesDescription,
      repository
    }
    setUuid(uuidv4())
    setFixturesName('')
    setFixturesDescription('')
    setRepository('未選択')
  }

  return (
    <div>
      <Head>
        <title>QR</title>
        <meta name="description" content="ｶﾆﾁｬﾝ!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>物品の登録</h1>
        { uuid !== "" &&
          <>
            <p>物品を登録しました。</p>
            <p>QRコードは保存してすぐに印刷を行ってください（二度と表示されません）。</p>
            <QR uuid={uuid} />
          </>
        }
        <div>
          <label>物品名</label>
          <input
            type="text"
            value={fixturesName}
            onChange={onChangeFixturesName}
          ></input>
        </div>
        <div>
          <label>説明</label>
          <textarea
            value={fixturesDescription}
            onChange={onChangeFixturesDescription}
          ></textarea>
        </div>
        <div>
          <label>格納場所: </label>
          <select onChange={onChangeRepository} value={repository}>
            <option>未選択</option>
            <option>図書館下</option>
            <option>実委室</option>
          </select>
        </div>
        <div>
          <TextArea
            label="説明"
            text={textarea}
            placeholder='赤色ケース・緑色パッチシール貼り付け済み'
            onChange={setTextarea}
            />
        </div>
        <button
          onClick={onClickRegisterButton}
          disabled={validButton()}
        >登録</button>
      </main>
    </div>
  )
}