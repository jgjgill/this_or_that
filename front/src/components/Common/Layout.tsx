import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'
import { Link, Outlet } from 'react-router-dom'
import { getMyPostInfo, test } from 'services/api'
import styles from './layout.module.scss'

const Layout = () => {
  const {
    isLoading: myInfoLoading,
    isError: myInfoIsError,
    data: myInfoData,
  } = useQuery(['myInfo'], () => getMyPostInfo('1'), {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const [cookie, setCookie, removeCookie] = useCookies(['jwt'])

  const handleClickLogin = () => {
    window.location.href = process.env.REACT_APP_API_AUTH_GOOGLE_LOGIN_URL!
  }

  const handleClickLogout = () => {
    test()
  }

  // console.log(myInfoData)

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>
          <Link to='/' className={styles.logo}>
            This Or That
          </Link>
        </h1>
      </header>

      <button type='button' onClick={handleClickLogin} className={styles.authButton}>
        Login
      </button>
      <button type='button' onClick={handleClickLogout} className={styles.authButton}>
        Logout
      </button>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
