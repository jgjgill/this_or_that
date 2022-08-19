import { Link, Outlet } from 'react-router-dom'
import styles from './layout.module.scss'

const Layout = () => {
  const handleClickLogin = () => {
    window.location.href = 'http://localhost:3005/auth/google/login'
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>
          <Link to='/' className={styles.logo}>
            This Or That
          </Link>
        </h1>
      </header>

      <button type='button' onClick={handleClickLogin}>
        Login
      </button>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
