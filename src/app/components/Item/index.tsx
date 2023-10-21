import React from 'react'
import styled from 'styled-components'

type ItemProp = {
  /**
   * 項目のラベルを設定します
   */
  label: string

  /**
   * 項目の中身を設定します
   */
  value: string
}

const StyledLabel = styled.label`
  color: #555555;
  font-size: 12px;
  display: block;
`

const StyledText = styled.p`
  display: block;
  margin-top: 4px;
  border: none;
  color: #555555;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 14px;
  outline: none;
  width: 100%;
`

/**
 * 1行のテキストを入力するためのコンポーネント
 */
const Item = (props: ItemProp) => {
  return (
    <div>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledText>{props.value}</StyledText>
    </div>
  )
}

export default Item
