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
