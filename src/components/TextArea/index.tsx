import React from "react";
import styled from "styled-components";

//TextAreaProps型の作成
type TextAreaProps = {
  label: string;
  text: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

//StyledLabelにCSSを適用したlabel要素を適用
const StyledLabel = styled.label`
  color: #555555;
  font-family: "Inter", "sans-serif";
  font-size: 8px;
`;

//StyledTextareaにCSSを適用したtextarea要素を適用
const StyledTextarea = styled.textarea.attrs<TextAreaProps>(({ onChange }) => {
  onChange
})`
  font-family: "Inter", "sans-serif";
  font-size: 12px;
  border-radius: 5px;
  width: 340px;
  height: 68px;"
  ::placeholder {
    color: #C5C5C5;
  }
`;

const TextArea = ({ label, text, placeholder, onChange }: TextAreaProps) => {
  return (
    <div>
      <StyledLabel
      style = {{ display: "block" }}
      htmlFor = "textarea"
      >
        { label }
      </StyledLabel>

      <StyledTextarea
        id = "textarea"
        value = {text}
        onChange = {onChange}
        placeholder = {placeholder}
      />
    </div>
  );
};

export default TextArea
