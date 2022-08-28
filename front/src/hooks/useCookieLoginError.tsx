import { useCookies } from 'react-cookie'

export const useCookieLoginError = () => {
  const [cookie] = useCookies(['jwt'])

  const notLoginError = () => {
    if (!cookie.jwt) throw new Error('Login Error')
  }

  return notLoginError
}
