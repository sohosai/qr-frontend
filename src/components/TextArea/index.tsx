import React from "react";
import styled from "styled-components";

/**
 * TextAreaProps型の作成
 */
type TextAreaProps = {
  label: string;
  text: string;
  placeholder: string;
  onChange: (event: string) => void;
};

/**
 * StyledLabelにCSSを適用したlabel要素を適用
 */
const StyledLabel = styled.label`
  color: #555555;
  font-size: 12px;
`;

/**
 * StyledTextareaにCSSを適用したtextarea要素を適用
 */
const StyledTextarea = styled.textarea.attrs<TextAreaProps>(({ onChange }) => {
  onChange
})`
  font-size: 16px;
  border-radius: 5px;
  width: 340px;
  height: 68px;
  border: none;
  outline: none;
  ::placeholder {
    color: #C5C5C5;
  }
`;

const TextArea = ({ label, text, placeholder, onChange }: TextAreaProps) => {
  return (
    <div>
      <StyledLabel
      style = {{ display: "block" }}
      htmlFor = "textarea">
        { label }
      </StyledLabel>

      <StyledTextarea
        id = "textarea"
        value = {text}
        onChange = {event => onChange(event.target.value)}
        placeholder = {placeholder}
      />
    </div>
  );
};

export default TextArea
