import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { register_auth_token, gen_passtoken, Result } from '@/lib/api'
import { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

const StyledInput = styled.input`
  display: block;
  margin-top: 4px;
  margin-button: 15px;
  border: none;
  color: #555555;
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 18px;
  outline: none;
  background-color: #f5f5f5;
  width: 100%;

  ::placeholder {
    color: #c5c5c5;
  }
`

type AuthDialogProps = {
  is_open: boolean
  handleClose: () => void
}

const AuthDialog = ({ is_open, handleClose }: AuthDialogProps) => {
  const [token, setToken] = useState('')
  const onChangeSetToken = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value)
  }

  const [reInput, setReInput] = useState(false)
  const [authErr, setAuthErr] = useState(false)

  const onClickRegisterToken = (token: string) => {
    ;(async () => {
      const passtoken: Result<string> = await gen_passtoken(token)
      if (passtoken == 'auth') {
        setAuthErr(true)
        setReInput(false)
        toast.error('ログインに失敗')
      } else if (
        passtoken == 'env' ||
        passtoken == 'server' ||
        passtoken == 'notfound' ||
        passtoken == 'void'
      ) {
        setReInput(true)
        setAuthErr(false)
        toast.error('ログインに失敗')
      } else {
        setReInput(false)
        setAuthErr(false)
        register_auth_token(passtoken)
        toast.success('ログインに成功')
        handleClose()
      }
    })()
  }

  return (
    <Dialog open={is_open} onClose={handleClose}>
      <DialogTitle id='auth-dialog-title'>ログイン用のキーを入力してください</DialogTitle>
      <DialogContent>
        <StyledInput value={token} onChange={onChangeSetToken}></StyledInput>
        {authErr ? (
          <DialogContentText>
            正しいキーではありません。もう一度入力してください。
          </DialogContentText>
        ) : (
          <></>
        )}
        {reInput ? (
          <DialogContentText>
            なんらかのエラーで登録に失敗しました。
            <br />
            申し訳ないですが、もう一度ログインしてください。
          </DialogContentText>
        ) : (
          <></>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ログインしない</Button>
        <Button
          onClick={() => {
            onClickRegisterToken(token)
          }}
        >
          ログインする
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthDialog
