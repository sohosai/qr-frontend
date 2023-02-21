import Head from 'next/head'
import { useRouter } from 'next/router'

/**
 * 物品を確認できる
 */
const FixturesId = () => {
  const router = useRouter()
  let { id } = router.query
  if (typeof id !== "string") {
    id = ""
  }
  type Fixture = {
    id: string,
    name: string
  }
  const fixtures = [
    {
      id: "8gzvj",
      name: "世界でいちばん簡単なUnixのe本"
    },
    {
      id: "w6356",
      name: "わかりやすいJavaEE ウェブシステム入門"
    },
    {
      id: "9ugqs",
      name: "わかりやすいJavaEE ウェブシステム入門"
    },
    {
      id: "3zzyi",
      name: "映像の原則",
    },
    {
      id: "9f0km",
      name: "Photoshop CSの仕事術",
    },
    {
      id: "pxims",
      name: "インターネットプロトコルがわかる"
    },
    {
      id: "d2aug",
      name: "新版 議論のレッスン"
    },
    {
      id: "h8fpf",
      name: "TOEIC L&Rテスト この1冊で750点"
    },
    {
      id: "2009z",
      name: "世界でいちばんなPythonプログラミングのe本"
    },
    {
      id: "sog4m",
      name: "応用情報技術者 テキスト&問題集"
    },
    {
      id: "x088r",
      name: "これからはじめるGIMPの本"
    },
    {
      id: "fijwa",
      name: "パーフェクトRuby"
    },
    {
      id: "5q9mr",
      name: "AfterEffects for アニメーション"
    },
    {
      id: "s8mm7",
      name: "AfterEffects デジタル映像制作講座"
    },
    {
      id: "jzobd",
      name: "プロを目指す人のためのRuby入門"
    },
    {
      id: "hp36u",
      name: "GIMP2.8 スーパーリファレンス for Windows & Macintosh"
    },
    {
      id: "hd59f",
      name: "これからはじめるIllustrationの本"
    },
    {
      id: "q9rv6",
      name: "うかる！基本情報技術者 午前編"
    },
    {
      id: "5oo1w",
      name: "うかる！基本情報技術者 午後アルゴリズム編"
    },
    {
      id: "493yx",
      name: "たのしいロゴづくり"
    },
    {
      id: "mqmk7",
      name: "令和二年 運勢暦"
    }
  ]
  const findFixture = (id: string): Fixture | null => {
    for (const fixture of fixtures) {
      if (id === fixture.id) {
        return fixture
      }
    }
    return null
  }
  const fixture = findFixture(id)
  return (
    <div>
      <Head>
        <title>QR</title>
        <meta name="description" content="ｶﾆﾁｬﾝ!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {fixture !== null ? (
            <>
              <p>物品ID: { fixture.id }</p>
              <p>物品名: { fixture.name }</p>
            </>
          ): (
            <p>物品IDが{ id }である物品はありませんでした</p>
          )
        }
      </main>
    </div>
  )
}

export default FixturesId
