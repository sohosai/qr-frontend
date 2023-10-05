import React from 'react'
import styled from 'styled-components'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Link from 'next/link'
import Item from '@/components/Item'
import { Lending } from '@/types'

/**
 * FixturesProps型の作成
 */
type LendingListProps = {
  lending_list: Lending[]
}

/**
 * StyledSelectにCSSを適用したselect要素を適用
 */
const StyledLendingList = styled.main.attrs<LendingListProps>(({ onChange }) => {
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
 * 貸し出し情報のリストを表示するコンポーネント
 */
const LendingList = ({ lending_list }: LendingListProps) => {
  return (
    <StyledLendingList>
      <List
        style={{
          backgroundColor: 'white',
          padding: '5px 13px',
          borderRadius: '10px',
        }}
      >
        {lending_list.map((lending, index) => (
          <>
            {index == 0 ? <></> : <Divider variant='fullWidth' />}
            <Stack direction='row'>
              <ListItem>
                <Text numberOfLines={0}>
                  <Link href={'/items/' + lending.fixtures_qr_id} target='_blank'>
                    {lending.fixtures_qr_id} <OpenInNewIcon fontSize='small' />
                  </Link>
                </Text>
              </ListItem>
            </Stack>
            <List
              style={{
                padding: '5px 25px',
                borderRadius: '10px',
              }}
            >
              <Item label='持って行った場所' value={lending.spot_name} />
              <Item label='借りた人' value={lending.borrower_name} />
              <Item label='借りた人の学籍番号' value={lending.borrower_number.toString()} />
              {lending.borrwer_org ? (
                <Item label='借りた人の所属組織' value={lending.borrwer_org} />
              ) : (
                <></>
              )}
            </List>
          </>
        ))}
      </List>
    </StyledLendingList>
  )
}

export default LendingList
