import React from 'react'
import styled from 'styled-components'

/**
 * SelectProps型の作成
 */
type SelectProps = {
  label: string
  required: boolean
  initial: string | null
  options: string[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
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
const StyledSelect = styled.select.attrs<SelectProps>(({ onChange }) => {
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
  background-color: #f5f5f5;
`

/**
 * 複数の選択の中から排他的に一つを選ぶSelectコンポーネント
 */
const Select = ({ label, required, initial, options, onChange }: SelectProps) => {
  return (
    <div>
      <StyledLabel htmlFor='select'>
        {label}
        {required ? '（必須）' : '（任意）'}
      </StyledLabel>

      <StyledSelect id='select' onChange={onChange}>
        {initial ? (
          <option key={initial} value={initial} selected>
            {initial}
          </option>
        ) : (
          <></>
        )}
        {options.map((v) =>
          v == initial ? (
            <></>
          ) : (
            <option key={v} value={v}>
              {v}
            </option>
          ),
        )}
      </StyledSelect>
    </div>
  )
}

export default Select
