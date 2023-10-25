import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import Collapse from '@mui/material/Collapse'
import Link from 'next/link'
import Item from '@/components/Item'
import { Spot, area2string } from '../../types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { toast } from 'react-toastify'
import axios from 'axios'

/**
 * FixturesProps型の作成
 */
type SpotListProps = {
  spot_list: Spot[]
}

/**
 * StyledSelectにCSSを適用したselect要素を適用
 */
const StyledSpotList = styled.main.attrs<SpotListProps>(({ onChange }) => {
  onChange
})`
  background-color: white;
  padding: 5px 13px;
  border-radius: 10px;
  font-size: 14px;
  width: 100%;
  border: none;
  outline: none;
  padding: 12px 15px;
  resize: none;
`

/**
 * Textコンポーネントの自前実装
 */
interface TextProps {
  children: React.ReactNode
  numberOfLines: number
}

const Text: React.FC<TextProps> = ({ children, numberOfLines }) => {
  const styles: React.CSSProperties = {}
  if (numberOfLines >= 1) {
    styles.WebkitLineClamp = numberOfLines
    styles.display = '-webkit-box'
    styles.WebkitBoxOrient = 'vertical'
    styles.overflow = 'hidden'
  }

  return <span style={styles}>{children}</span>
}

/**
 * 複数の選択の中から排他的に一つを選ぶSelectコンポーネント
 */
const SpotList = ({ spot_list }: SpotListProps) => {
  const [isMoreList, setIsMoreList] = useState<boolean[]>(Array(spot_list.length).fill(false))
  useEffect(() => {
    setIsMoreList(Array(spot_list.length).fill(false))
  }, [spot_list])

  const onChangeIsMoreList = (i: number): void => {
    setIsMoreList(isMoreList.map((b, index) => (index == i ? !b : b)))
  }

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteSpotName, setDeleteSpotName] = useState('')
  const handleOpen = (name: string): void => {
    setDeleteDialogOpen(true)
    setDeleteSpotName(name)
  }
  const handleClose = (): void => {
    setDeleteDialogOpen(false)
    setDeleteSpotName('')
  }

  const deleteSpot = (name: string): void => {
    const api_url = process.env.NEXT_PUBLIC_QR_API_URL
    if (api_url) {
      const url = api_url + '/delete_spot?name=' + name
      ;(async () => {
        try {
          await axios.delete(url)
          toast.success('削除に成功')
          //! 変更 (Myxogastria0808)
          window.location.href = '/spot'
          //! 変更 (Myxogastria0808)
        } catch (err) {
          toast.error('削除に失敗')
          //! 変更 (Myxogastria0808)
          window.location.href = '/spot'
          //! 変更 (Myxogastria0808)
        }
      })()
    }
  }

  return (
    <StyledSpotList>
      <List
        style={{
          padding: '5px 13px',
          borderRadius: '10px',
        }}
      >
        {spot_list.map((spot, index) => (
          <>
            <Dialog
              open={deleteDialogOpen}
              onClose={() => {
                handleClose()
              }}
              aria-labelledby='fixtures delete dialog'
            >
              <DialogContent>
                <DialogContentText id='delete dialog text'>
                  本当にこの場所情報を削除しますか？
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleClose()
                  }}
                >
                  削除しない
                </Button>
                <Button
                  onClick={() => {
                    deleteSpot(deleteSpotName)
                    handleClose()
                  }}
                >
                  削除する
                </Button>
              </DialogActions>
            </Dialog>
            {index == 0 ? <></> : <Divider variant='fullWidth' />}
            <Stack direction='row'>
              {isMoreList[index] ? (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge='end'
                      aria-label='more-info'
                      onClick={() => {
                        onChangeIsMoreList(index)
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  }
                >
                  <Text numberOfLines={0}>
                    {spot.name}
                    <IconButton
                      edge='end'
                      aria-label='edit-spot'
                      href={`/spot/info_edit?&name=${spot.name}`}
                      LinkComponent={Link}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delet-spot'
                      onClick={() => {
                        handleOpen(spot.name)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Text>
                </ListItem>
              ) : (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge='end'
                      aria-label='more-info'
                      onClick={() => {
                        onChangeIsMoreList(index)
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  }
                >
                  <Text numberOfLines={1}>
                    {spot.name}
                    <IconButton
                      edge='end'
                      aria-label='edit-spot'
                      href={`/spot/info_edit?&name=${spot.name}`}
                      LinkComponent={Link}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delet-spot'
                      onClick={() => {
                        handleOpen(spot.name)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Text>
                </ListItem>
              )}
            </Stack>
            <Collapse in={isMoreList[index]} timeout='auto' unmountOnExit>
              <List
                style={{
                  padding: '5px 25px',
                  borderRadius: '10px',
                }}
              >
                <Item label='場所' value={area2string(spot.area)} />
                {spot.building ? <Item label='建物' value={spot.building} /> : <></>}
                {spot.floor ? <Item label='階' value={spot.floor.toString()} /> : <></>}
                {spot.room ? <Item label='部屋番号' value={spot.room} /> : <></>}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </StyledSpotList>
  )
}

export default SpotList
