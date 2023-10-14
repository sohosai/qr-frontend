import { useEffect, useState } from 'react'
import { Fixtures, Lending } from '@/types'
import { useRouter } from 'next/router'
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
import axios from 'axios'
import styled from 'styled-components'
import Link from 'next/link'

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

  useEffect(() => {
    if (typeof route.query.qr_id !== 'string') return

    const qr_id = route.query.qr_id
    const api_url = process.env.NEXT_PUBLIC_QR_API_URL
    if (qr_id !== null && api_url !== undefined) {
      console.log('called')
      ;(async () => {
        const url_fixtures = api_url + '/get_fixtures?qr_id=' + qr_id
        const url_lending = api_url + '/get_lending?fixtures_qr_id=' + qr_id
        console.log({ url_fixtures })
        setQueried(true)
        try {
          const response_fixtures = await axios.get(url_fixtures)
          setFixtures(response_fixtures.data)
          const response_lending = await axios.get(url_lending)
          setLending(response_lending.data)
        } catch (err) {
          toast.error('URLが無効なため表示に失敗')
          setFixtures(null)
        }
      })()
    } else {
      setQueried(false)
    }
  }, [route])

  const deleteFixtures = (id: string): void => {
    const api_url = process.env.NEXT_PUBLIC_QR_API_URL
    if (api_url) {
      const url = api_url + '/delete_fixtures?id=' + id
      ;async () => {
        try {
          await axios.post(url)
          toast.success('削除に成功')
        } catch (err) {
          toast.error('削除に失敗')
        }
      }
    }
    //TODO!
  }

  if (queried) {
    return (
      <>
        <Header />
        <StyledMain>
          {fixtures ? (
            <>
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
                      setDeleteDialogOpen(false)
                    }}
                  >
                    削除する
                  </Button>
                </DialogActions>
              </Dialog>
              {fixtures.model_number !== null ? <p>{fixtures.model_number}</p> : <></>}
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
              {fixtures.description == null ? (
                <></>
              ) : (
                <Item label='description' value={fixtures.description} />
              )}
              {fixtures.note == null ? <></> : <Item label='note' value={fixtures.note} />}
              {fixtures.usage !== null ? <Item label='用途' value={fixtures.usage} /> : <></>}
              {fixtures.usage_season !== null ? (
                <Item label='使用時期' value={fixtures.usage_season} />
              ) : (
                <></>
              )}
            </>
          ) : (
            <>fixturesがnull or undefined</>
          )}
        </StyledMain>
      </>
    )
  } else {
    return (
      <>
        <Header />
        <p>クエリが存在しない</p>
      </>
    )
  }
}

export default FixturesShow
