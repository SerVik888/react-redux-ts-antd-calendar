import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { Event } from '../pages/Event'
import { Login } from '../pages/Login'

export const AppRouter: FC = () => {
  const { isAuth } = useTypeSelector(state => state.auth)
  return isAuth ? (
    <Routes>
      <Route path={'/'} element={<Event />} />
      <Route path={'*'} element={<Navigate to='/' />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'*'} element={<Navigate to='/login' />} />
    </Routes>
  )
}
