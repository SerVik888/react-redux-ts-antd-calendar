import { Button, Form, Input } from 'antd'
import { FC, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { rules } from '../utils/rules'

export const LoginForm: FC = () => {
  const { isLoading, error } = useTypeSelector(state => state.auth)
  const { login } = useActions()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    login(username, password)
  }

  return (
    <Form onFinish={submit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form.Item label='Логин' name='username' rules={[rules.required('Пожалуйста введите имя!')]}>
        <Input value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item label='Пароль' name='password' rules={[rules.required('Пожалуйста введите пароль!')]}>
        <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}
