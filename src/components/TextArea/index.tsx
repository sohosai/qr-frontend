import React from "react";
import styled from "styled-components";

/**
 * TextAreaProps型の作成
 */
type TextAreaProps = {
  label: string;
  text: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

/**
 * StyledLabelにCSSを適用したlabel要素を適用
 */
const StyledLabel = styled.label`
  display: block;
  color: #555555;
  font-size: 12px;
  margin-bottom: 4px;
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
  padding: 8px 15px;
  ::placeholder {
    color: #C5C5C5;
  }
  resize: none;
`;

/**
 * 複数行の入力を受け付けるTextAreaコンポーネント
 */
const TextArea = ({ label, text, placeholder, onChange }: TextAreaProps) => {
  return (
    <div>
      <StyledLabel
      htmlFor = "textarea">
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
