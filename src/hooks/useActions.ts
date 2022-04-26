import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppDispatch } from '../store'
import { AllActionCreators } from '../store/reducers/action-creators'

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return bindActionCreators(AllActionCreators, dispatch)
}
