import styled from 'styled-components'

type TextInputProp = {
  /**
   * 入力フォームのラベルを設定します
   */
  label: string
  
  /**
   * 入力前に薄く表示されるデフォルトの表示（placeholder）を設定します
   */
  placeholder: string

  /**
   * フォームの横の長さを設定します
   */
  width: number

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
  font-weight: 700;
`

const StyledInputText = styled.input.attrs<TextInputProp>(({ placeholder, onChange, value }) => ({
  type: 'text',
  placeholder,
  onChange,
  value
}))<TextInputProp>`
  display: block;
  margin-top: 4px;
  border: 0;
  color: #555555;
  border-radius: 6px;
  padding: 12px 30px;
  font-size: 16px;
  outline: none;
  background-color: white;
  width: ${({ width }) => width}px;
  font-weight: 700;

  ::placeholder {
    color: #C5C5C5;
  }
`

const TextInput = (props: TextInputProp) => {
  return (
    <div>
      <StyledLabel>{ props.label }</StyledLabel>
      <StyledInputText {...props} />
    </div>
  )
}

export default TextInput
