import { useCookies } from 'react-cookie'
import { setIsViewTrue } from 'states/loginRequestModalData'
import { useAppDispatch } from './useAppDispatch'

export const useCookieLoginError = () => {
  const [cookie] = useCookies(['jwt'])
  const dispatch = useAppDispatch()

  const notLoginError = () => {
    if (!cookie.jwt) {
      dispatch(setIsViewTrue())

      throw new Error('Login Error')
    }
  }

  return notLoginError
}
