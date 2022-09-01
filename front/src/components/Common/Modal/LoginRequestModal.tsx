import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useRef } from 'react'
import { useClickAway } from 'react-use'
import { getloginRequestModalValue, setIsViewFalse } from 'states/loginRequestModalData'
import BasicButton from '../Button/BasicButton'
import styles from './loginRequestModal.module.scss'

interface LoginRequestModalProps {
  isView: boolean
}

const LoginRequestModal = ({ isView }: LoginRequestModalProps) => {
  const ref = useRef(null)

  const dispatch = useAppDispatch()

  const handleClickLogin = () => {
    window.location.href = process.env.REACT_APP_API_AUTH_GOOGLE_LOGIN_URL!
  }

  useClickAway(ref, () => {
    dispatch(setIsViewFalse())
  })

  if (!isView) return null

  return (
    <div ref={ref} className={styles.modalWrapper}>
      <BasicButton isView onClick={handleClickLogin} text='Sign up With Google' />
    </div>
  )
}

export default LoginRequestModal
