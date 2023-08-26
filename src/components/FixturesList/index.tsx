import React from 'react'
import styled from 'styled-components'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import { Fixtures } from '../../types'

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
  const styles: React.CSSProperties = {};
  if (numberOfLines >= 1) {
    styles.WebkitLineClamp = numberOfLines;
    styles.display = '-webkit-box';
    styles.WebkitBoxOrient = 'vertical';
    styles.overflow = 'hidden';
  }

  return <span style={styles}>{children}</span>;
};


/**
 * 複数の選択の中から排他的に一つを選ぶSelectコンポーネント
 */
const FixturesList = ({ fixtures_list }: FixturesListProps) => {
  return (
    <List
      style={{
        backgroundColor: 'white',
        padding: '5px 13px',
        borderRadius: '10px',
      }}
    >
      {fixtures_list.map((v, index) => (
        <>
          {index == 0 ? <></> : <Divider variant='fullWidth' />}
          <Stack direction='row'>
            <ListItem
              secondaryAction={
                <IconButton edge='end' aria-label='more-info'>
                  <MoreHoriz />
                </IconButton>
              }
            >
              <Text numberOfLines={1}>
                {v.name}
              </Text>
            </ListItem>
          </Stack>
        </>
      ))}
    </List>
  )
}

export default FixturesList
