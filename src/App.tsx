import { Layout } from 'antd'
import { FC, useEffect } from 'react'
import './App.css'
import { AppRouter } from './components/AppRouter'
import { NavBar } from './components/NavBar'
import { useActions } from './hooks/useActions'
import { IUser } from './models/IUser'

const App: FC = () => {
  const { setIsAuth, setUser } = useActions()

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({ username: localStorage.getItem('username' || '') } as IUser)
      setIsAuth(true)
    }
  }, [])
  return (
    <Layout className='App'>
      <NavBar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  )
}

export default App
