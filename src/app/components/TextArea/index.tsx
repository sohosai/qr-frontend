import React from 'react'
import styled from 'styled-components'

/**
 * TextAreaProps型の作成
 */
type TextAreaProps = {
  required: boolean
  label: string
  text: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
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
 * StyledTextareaにCSSを適用したtextarea要素を適用
 */
const StyledTextarea = styled.textarea.attrs<TextAreaProps>(({ onChange }) => {
  onChange
})`
  display: block;
  font-size: 14px;
  border-radius: 5px;
  width: 100%;
  height: 68px;
  border: none;
  outline: none;
  padding: 8px 15px;
  ::placeholder {
    color: #c5c5c5;
  }
  resize: none;
`

/**
 * 複数行の入力を受け付けるTextAreaコンポーネント
 */
const TextArea = ({ label, required, text, placeholder, onChange }: TextAreaProps) => {
  return (
    <div>
      <StyledLabel htmlFor='textarea'>
        {label}
        {required ? '（必須）' : '（任意）'}
      </StyledLabel>

      <StyledTextarea
        id='textarea'
        value={text}
        onChange={onChange}
        placeholder={placeholder}
        style={{ backgroundColor: '#F5F5F5' }}
      />
    </div>
  )
}

export default TextArea
