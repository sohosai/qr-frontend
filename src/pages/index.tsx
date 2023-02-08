import Head from 'next/head'

import TextArea from 'components/TextArea'

export default function Home() {
  return (
    <div>
      <Head>
        <title>QR</title>
        <meta name="description" content="ｶﾆﾁｬﾝ!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>    
        <div>
          <TextArea/>
        </div>
      </main>
    </div>
  )
}
