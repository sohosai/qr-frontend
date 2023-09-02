import Link from 'next/link'
import Button from '@mui/material/Button'

/**
 * QRにログインした際に最初に表示されるトップページ
 * 各ページに飛べるようにボタンを配置する
 */
export default function Home() {
  return (
    <>
      <div>物品管理アプリケーション</div>
      <div>
        <Button variant='contained' size='large' LinkComponent={Link} href='/lending'>
          貸し出し
        </Button>
      </div>
      <div>
        <Button variant='contained' size='large' LinkComponent={Link} href='/register'>
          登録
        </Button>
      </div>
      <div>
        <Button variant='contained' size='large' LinkComponent={Link} href='/printing'>
          印刷
        </Button>
      </div>
    </>
  )
}
