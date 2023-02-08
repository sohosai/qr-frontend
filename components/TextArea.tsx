import { useState, useMemo } from "react"
export default function TextArea () {
  const [fixturesDescription, setFixturesDescription] = useState("")
  const onChangeFixturesDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFixturesDescription(event.target.value)
  }
  return (
    <div>
      <label>label</label>
      <textarea
        value={fixturesDescription}
        onChange={onChangeFixturesDescription}
      ></textarea>
  </div>
  );
}