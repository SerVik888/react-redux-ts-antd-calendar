import { Layout, Menu, Row } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypeSelector } from '../hooks/useTypeSelector'

export const NavBar: FC = () => {
  const navigate = useNavigate()
  const { isAuth, user } = useTypeSelector(state => state.auth)
  const { logout } = useActions()

  return (
    <Layout.Header>
      <Row justify='end'>
        {isAuth ? (
          <>
            <div style={{ color: 'white' }}>{user.username}</div>
            <Menu theme='dark' mode='horizontal' selectable={false}>
              <Menu.Item onClick={logout} key={1} style={{ color: 'white' }}>
                Выход
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme='dark' mode='horizontal' selectable={false}>
            <Menu.Item onClick={() => navigate('/login')} key={1} style={{ color: 'white' }}>
              Войти
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  )
}
