import { useAppSelector } from 'hooks/useAppSelector'
import ModalPortal from 'portal'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link, Outlet } from 'react-router-dom'
import { getLogout, getAuthStatus } from 'services/api'
import { getloginRequestModalValue } from 'states/loginRequestModalData'
import { getReCommentModalValue } from 'states/reCommentModalData'
import BasicButton from './Button/BasicButton'
import styles from './layout.module.scss'
import LoginRequestModal from './Modal/LoginRequestModal'
import ReCommentFormModal from './Modal/ReCommentFormModal'

const Layout = () => {
  const [cookie] = useCookies(['jwt'])

  const reCommentModalValue = useAppSelector(getReCommentModalValue)
  const loginRequestModalValue = useAppSelector(getloginRequestModalValue)

  const handleClickLogin = () => {
    window.location.href = process.env.REACT_APP_API_AUTH_GOOGLE_LOGIN_URL!
  }

  const handleClickLogout = () => {
    getLogout().then(() => {
      window.location.reload()
    })
  }

  useEffect(() => {
    if (!cookie.jwt) return

    getAuthStatus()
  }, [cookie])

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>
          <Link to='/' className={styles.logo}>
            This Or That
          </Link>
        </h1>
      </header>

      <nav className={styles.navBar}>
        <BasicButton onClick={handleClickLogin} isView={!cookie.jwt} text='Login' />
        <BasicButton onClick={handleClickLogout} isView={cookie.jwt} text='Logout' />

        <Link to='profile' className={styles.profile}>
          Profile
        </Link>
      </nav>

      <main>
        <Outlet />
      </main>

      <ModalPortal>
        <ReCommentFormModal isView={reCommentModalValue.isView} commentId={reCommentModalValue.commentId!} />
        <LoginRequestModal isView={loginRequestModalValue.isView} />
      </ModalPortal>
    </div>
  )
}

export default Layout
