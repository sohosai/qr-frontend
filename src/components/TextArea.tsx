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
    color: #555555;
    font-family: "Inter", "sans-serif";
    font-size: 8px;
  `
  //StyledTextareaにCSSを適用したtextarea要素を適用
  const StyledTextarea = styled.textarea`
    font-family: "Inter", "sans-serif";
    font-size: 12px;
    border-radius: 5px;
    ::placeholder: #C5C5C5
  `
  return (
    <div>
      <StyledLabel
      style = {{ display: "block" }}
      for = "textarea"
      >
        { label }
      </StyledLabel>

      <StyledTextarea
        id = "textarea"
        rows = "4"
        cols = "33"
        value = {text}
        onChange = {(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        placeholder = {placeholder}
      />
    </div>
  );
}
