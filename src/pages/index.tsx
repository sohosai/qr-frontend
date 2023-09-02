import Header from '@/components/Header'

/**
 * QRにログインした際に最初に表示されるトップページ
 * 各ページに飛べるようにボタンを配置する
 */
export default function Home() {
  return (
    <>
      <Header />
      <div>物品管理アプリケーション</div>
    </>
  )
}
