import React from "react"

type TextProps = {
  label: string 
}

export const IncorrectTextBox = ({ label }: TextProps) => {
  const [text, setText] = React.useState("");

  return (
    <label style={{display: "block" }}>
      {`${label}`}
      <input
        value = {text}
        onChange = {event => setText(event.target.value)} />
    </label>
  );
}
