import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid'
import { useState } from "react"
import QRCode from '@/components/QRCode'
import TextArea from '@/components/TextArea'
import Button from '@/components/Button'
import styled from "styled-components";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
  palette: {
    background: {
      default: '#E5E5E5',
    }
  },
});
const StyledMain = styled.main`
  margin: 44px 15px;
  h1 {
    font-size: 16px
  }
`;


/**
 * 物品を登録できる
 */
const FixturesIndex = () => {
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
        <div>
          <TextArea
            label="説明"
            placeholder=""
            text={fixturesDescription}
            onChange={onChangeFixturesDescription}
          />
        </div>
        <Button
          onClick={onClickRegisterButton}
          disabled={validButton()}
          text="登録"
        />
      </StyledMain>
    </ThemeProvider>
  )
}

export default FixturesIndex
