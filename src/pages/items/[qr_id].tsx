import { useEffect, useState } from 'react'
import { Fixtures, Lending } from '@/types'
import router, { useRouter } from 'next/router'
import { initQRCode } from '@/lib/QRCode'
import QRCode from '@/components/QRCode'
import Header from '@/components/Header'
import Item from '@/components/Item'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Link from 'next/link'
import { Box } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import CustomHead from '@/components/CustomHead'
import { get_fixtures, get_lending, delete_fixtures, Result } from '@/lib/api'
import AuthDialog from '@/components/AuthDialog'

const StyledMain = styled.main.withConfig({
  displayName: 'StyledMain',
})`
  position: static;
  margin: 30px 30px;
  font-weight: 700;
  h1 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 16px;
  }
`

const FixturesShow = () => {
  const route = useRouter()
  const [fixtures, setFixtures] = useState<Fixtures | null>(null)
  const [lending, setLending] = useState<Lending | null>(null)
  const [queried, setQueried] = useState(false)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [authOpen, setAuthOpen] = useState(false)
  const handleAuthDialogClose = (): void => {
    setAuthOpen(false)
  }

  useEffect(() => {
    if (typeof route.query.qr_id !== 'string') return

    const qr_id = route.query.qr_id
    if (qr_id) {
      console.log('called')
      ;(async () => {
        const fixtures_res: Result<Fixtures> = await get_fixtures({
          id_type: 'FixturesQrId',
          id: qr_id,
        })
        const lending_res: Result<Lending> = await get_lending({
          id_type: 'FixturesQrId',
          id: qr_id,
        })
        if (fixtures_res == 'auth') {
          // 認証を生成させる表示を出すようにする
          setAuthOpen(true)
          setFixtures(null)
          setLending(null)
          setQueried(false)
        } else if (
          fixtures_res == 'env' ||
          fixtures_res == 'server' ||
          fixtures_res == 'notfound' ||
          fixtures_res == 'void' ||
          lending_res == 'env' ||
          lending_res == 'server' ||
          lending_res == 'void'
        ) {
          toast.error('表示に失敗')
          setFixtures(null)
          setLending(null)
          setQueried(false)
        } else {
          setFixtures(fixtures_res)
          if (lending_res == 'notfound' || lending_res == 'auth') {
            setLending(null)
          } else {
            setLending(lending_res)
          }
          setQueried(true)
        }
      })()
    } else {
      setQueried(false)
    }
  }, [route])

  const deleteFixtures = (id: string): void => {
    ;(async () => {
      const res: Result<void> = await delete_fixtures({
        id_type: 'FixturesQrId',
        id: id,
      })
      if (res == 'auth') {
        // 認証を生成させる表示を出すようにする
        setAuthOpen(true)
      } else if (res == 'env' || res == 'server' || res == 'notfound') {
        toast.error('削除に失敗')
        setDeleteDialogOpen(false)
      } else {
        toast.success('削除に成功')
        setDeleteDialogOpen(false)
        //物品検索ページに誘導するために必要
        router.replace('/')
      }
    })()
  }

  if (queried) {
    return (
      <>
        <CustomHead />
        <Header />
        <Box sx={{ width: '100%', height: '120px' }}></Box>
        <StyledMain>
          {fixtures ? (
            <>
              <Box sx={{ width: '100%', maxWidth: '1024px', m: 'auto' }}>
                <h1>
                  {fixtures.name}
                  <IconButton
                    edge='end'
                    aria-label='more-info'
                    href={'/items/info_edit?&fixtures_id=' + fixtures.id}
                    LinkComponent={Link}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge='end'
                    aria-label='more-info'
                    onClick={() => {
                      setDeleteDialogOpen(true)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </h1>
                <Dialog
                  open={deleteDialogOpen}
                  onClose={() => {
                    setDeleteDialogOpen(false)
                  }}
                  aria-labelledby='fixtures delete dialog'
                >
                  <DialogContent>
                    <DialogContentText id='delete dialog text'>
                      本当にこの物品情報を削除しますか？
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setDeleteDialogOpen(false)
                      }}
                    >
                      削除しない
                    </Button>
                    <Button
                      onClick={() => {
                        deleteFixtures(fixtures.id)
                      }}
                    >
                      削除する
                    </Button>
                  </DialogActions>
                </Dialog>
                {fixtures.model_number ? <p>{fixtures.model_number}</p> : <></>}
                <Item label='uuid' value={fixtures.id} />
                <QRCode qr={initQRCode(fixtures.qr_id, fixtures.qr_color)}></QRCode>
                <Item label='保管場所' value={fixtures.storage + '/' + fixtures.parent_id} />
                {lending ? (
                  <>
                    <Item label='現在位置（貸出）' value={lending.spot_name} />
                  </>
                ) : (
                  <></>
                )}
                {fixtures.description ? (
                  <Item label='description' value={fixtures.description} />
                ) : (
                  <></>
                )}
                {fixtures.note ? <Item label='note' value={fixtures.note} /> : <></>}
                {fixtures.usage ? <Item label='用途' value={fixtures.usage} /> : <></>}
                {fixtures.usage_season ? (
                  <Item label='使用時期' value={fixtures.usage_season} />
                ) : (
                  <></>
                )}
                <LinkButton text={'トップに戻る'} onClick={() => router.push('/')} />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ width: '100%', maxWidth: '1024px', m: 'auto' }}>
                <p>fixturesがnull or undefined</p>
                <LinkButton text={'トップに戻る'} onClick={() => router.push('/')} />
              </Box>
            </>
          )}
          <AuthDialog is_open={authOpen} handleClose={handleAuthDialogClose} />
        </StyledMain>
      </>
    )
  } else {
    return (
      <>
        <CustomHead />
        <Header />
        <Box sx={{ width: '100%', height: '120px' }}></Box>
        <Box sx={{ width: '100%', maxWidth: '1024px', m: 'auto' }}>
          <LinkButton text={'トップに戻る'} onClick={() => router.push('/')} />
        </Box>
      </>
    )
  }
}

export default FixturesShow
