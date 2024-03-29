import React from 'react'
import styled from 'styled-components'

type TextInputProp = {
  /**
   * 入力フォームのラベルを設定します
   */
  label: string

  /**
   * 必須の入力かどうか
   */
  required: boolean

  /**
   * 入力前に薄く表示されるデフォルトの表示（placeholder）を設定します
   */
  placeholder: string

  /**
   * フォームの入力値を設定します
   */
  value: string

  /**
   * フォームの内容が変更された場合に発火するイベント
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledLabel = styled.label`
  color: #555555;
  font-size: 12px;
  display: block;
`

const StyledInputText = styled.input.attrs<TextInputProp>(({ placeholder, onChange, value }) => ({
  type: 'text',
  placeholder,
  onChange,
  value,
}))<TextInputProp>`
  display: block;
  margin-top: 4px;
  border: none;
  color: #555555;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 14px;
  outline: none;
  background-color: #f5f5f5;
  width: 100%;

  ::placeholder {
    color: #c5c5c5;
  }
`

/**
 * 1行のテキストを入力するためのコンポーネント
 */
const TextInput = (props: TextInputProp) => {
  return (
    <div>
      <StyledLabel>
        {props.label}
        {props.required ? '（必須）' : '（任意）'}
      </StyledLabel>
      <StyledInputText {...props} />
    </div>
  )
}

export default TextInput
