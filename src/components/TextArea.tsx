import React from "react"
import styled from "styled-components"

//TextProps型の作成
type TextProps = {
  label: string
  text: string
  placeholder: string
  onChange: (value: string) => void
}

export const TextArea = ({ label, text, placeholder, onChange }: TextProps) => {
  //StyledLabelにCSSを適用したlabel要素を適用
  const StyledLabel = styled.label`
    color: #555555
  `
  //StyledTextareaにCSSを適用したtextarea要素を適用
  const StyledTextarea = styled.textarea`
    ::placeholder: #C5C5C5
  `
  return (
    <StyledLabel style={{ display: "block" }}>
      { label }
      <StyledTextarea
        value = {text}
        onChange = {(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        placeholder = {placeholder}
        />
    </StyledLabel>
  );
}
