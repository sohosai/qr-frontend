import React, { useState } from 'react'
import styled from 'styled-components'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Collapse from '@mui/material/Collapse'
import Link from 'next/link'
import Item from '@/components/Item'
import { Fixtures, QRCodeColorsToKanji } from '../../types'

/**
 * FixturesProps型の作成
 */
type FixturesListProps = {
  fixtures_list: Fixtures[]
}

/**
 * StyledLabelにCSSを適用したlabel要素を適用
 */
const StyledLabel = styled.label`
  display: block;
  color: #555555;
  font-size: 12px;
  margin-bottom: 4px;
`

/**
 * StyledSelectにCSSを適用したselect要素を適用
 */
const StyledFixturesList = styled.select.attrs<FixturesListProps>(({ onChange }) => {
  onChange
})`
  display: block;
  font-size: 14px;
  border-radius: 5px;
  width: 100%;
  border: none;
  outline: none;
  padding: 12px 15px;
  resize: none;
  background-color: white;
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
const FixturesList = ({ fixtures_list }: FixturesListProps) => {
  const [isMoreList, setIsMoreList] = useState<boolean[]>(Array(fixtures_list.length).fill(false))

  const onChangeIsMoreList = (i: number): void => {
    setIsMoreList(isMoreList.map((b, index) => (index == i ? !b : b)))
  }

  return (
    <List
      style={{
        backgroundColor: 'white',
        padding: '5px 13px',
        borderRadius: '10px',
      }}
    >
      {fixtures_list.map((fixtures, index) => (
        <>
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
                  <Link href='/items/${fixtures.qr_id}' target='_blank'>
                    {fixtures.name} <OpenInNewIcon fontSize='small' />
                  </Link>
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
                  <Link href='/items/${fixtures.qr_id}' target='_blank'>
                    {fixtures.name} <OpenInNewIcon fontSize='small' />
                  </Link>
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
              <Item
                label='QR'
                value={fixtures.qr_id + '（' + QRCodeColorsToKanji[fixtures.qr_color] + ')'}
              />
              {fixtures.model_number !== null ? <p>{fixtures.model_number}</p> : <></>}
              <Item label='保管場所' value={fixtures.storage + '/' + fixtures.parent_id} />
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
            </List>
          </Collapse>
        </>
      ))}
    </List>
  )
}

export default FixturesList
