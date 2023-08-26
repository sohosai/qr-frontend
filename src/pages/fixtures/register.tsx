import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react"
import styled from "styled-components";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import QRCode from '@/components/QRCode'
import TextInput from '@/components/TextInput';
import TextArea from '@/components/TextArea'
import Button from '@/components/Button'
import Select from '@/components/Select'


const theme = createTheme({
  palette: {
    background: {
      default: '#E5E5E5',
    }
  },
});
const StyledMain = styled.main.withConfig({
  displayName: "StyledMain",
})`
  position: static;
  margin: 30px 30px;
  font-weight: 700;
  h1 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 16px;
  }
  div {
    margin: 4px;
    margin-bottom: 10px;
  }
  .buttonContainer {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
`;


/**
 * 物品を登録できる
 */
const FixturesRegister = () => {
  const [uuid, setUuid] = useState("")

  const [fixturesName, setFixturesName] = useState("")
  const onChangeFixturesName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFixturesName(event.target.value)
  }
  const [fixturesDescription, setFixturesDescription] = useState("")
  const onChangeFixturesDescription = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFixturesDescription(event.target.value)
  }
  const [repository, setRepository] = useState('未選択')
  const onChangeRepository = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setRepository(event.target.value)
  }

  const validButton = (): boolean => {
    return fixturesName == '' || fixturesDescription == '' || repository == '未選択'
  }
  const onClickRegisterButton = (): void => {
    const json = {
      uuid,
      name: fixturesName,
      description: fixturesDescription,
      repository
    }
    setUuid(uuidv4())
    setFixturesName('')
    setFixturesDescription('')
    setRepository('未選択')
  }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>QR</title>
        <meta name="description" content="ｶﾆﾁｬﾝ!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledMain>
        <h1>物品の登録</h1>
        { uuid !== "" &&
          <>
            <p>物品を登録しました。</p>
            <p>QRコードは保存してすぐに印刷を行ってください（二度と表示されません）。</p>
            <QRCode uuid={uuid} />
          </>
        }
        <div className='FixturesNameTextInput'>
          <TextInput
            label="物品名"
            placeholder="LANケーブル 100m"
            value={fixturesName}
            onChange={onChangeFixturesName}
          />
        </div>
        <div className='fixturesDescriptionTextArea'>
          <TextArea
            label="説明"
            placeholder="赤色ケース・緑色パッチシール貼り付け済み"
            text={fixturesDescription}
            onChange={onChangeFixturesDescription}
          />
        </div>
        <div className='fixturesRepositoryOption'>
          <Select
            label="格納場所"
            options={["未選択", "101号室", "102号室", "206号室"]}
            onChange={onChangeRepository}
          />
        </div>
        <div className='FixturesRegisterButton'>
          <Button
            onClick={onClickRegisterButton}
            disabled={validButton()}
            text="登録"
          />
        </div>
      </StyledMain>
    </ThemeProvider>
  )
}

export default FixturesRegister
