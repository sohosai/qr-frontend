import Head from 'next/head'

export default function CustomHead() {
  return (
    <Head>
      <title>QR 物品管理</title>
      <meta name='theme-color' content='#1ab9cc' />
      <meta name='description' content='物品管理アプリケーションです。' />
      <meta property='og:description' content='物品管理アプリケーションです。' />
      <meta property='og:title' content='物品管理アプリケーション' />
      <meta property='og:image:width' content='1500' />
      <meta property='og:image' content='/og-img.webp' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://qr.sohosai.com/' />
    </Head>
  )
}
