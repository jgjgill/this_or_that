import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link, Outlet } from 'react-router-dom'
import { getLogout, getAuthStatus } from 'services/api'
import Button from './Button'
import styles from './layout.module.scss'

const Layout = () => {
  const [cookie] = useCookies(['jwt'])

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
        <Button onClick={handleClickLogin} isView={!cookie.jwt} text='Login' />
        <Button onClick={handleClickLogout} isView={cookie.jwt} text='Logout' />

        <Link to='profile' className={styles.profile}>
          Profile
        </Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
