import axios from 'axios'
import { AppDispatch } from '../..'
import { UserService } from '../../../api/userService'
import { IUser } from '../../../models/IUser'
import { AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from './types'

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
  setIsAuth: (isAuth: boolean): SetAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: isAuth }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  setError: (error: string): SetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload: error }),

  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      setTimeout(async () => {
        const response = await UserService.getUser()
        const mockUser = response.data.find(user => username === user.username && password === user.password)
        if (mockUser) {
          localStorage.setItem('auth', 'true')
          localStorage.setItem('username', mockUser.username)

          dispatch(AuthActionCreators.setUser(mockUser))
          dispatch(AuthActionCreators.setIsAuth(true))
        } else {
          dispatch(AuthActionCreators.setError('Не корректный логин или пароль...'))
        }
        dispatch(AuthActionCreators.setIsLoading(false))
      }, 1000)
    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка повторите попытку...'))
    }
  },

  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
    dispatch(AuthActionCreators.setUser({} as IUser))
    dispatch(AuthActionCreators.setIsAuth(false))
  },
}
