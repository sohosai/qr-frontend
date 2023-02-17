import React from "react"

type TextProps = {
  label: string
  text: string
  placeholder: string
  onChange: (value: string) => void
}

export const TextArea = ({ label, text, placeholder, onChange }: TextProps) => {


  return (
    <label style={{display: "block" }}>
      {`${label}`}

      <input
        value = {text}
        onChange = {event => onChange(event.target.value)}
        placeholder = {placeholder}
        />
        
    </label>

  );
}

