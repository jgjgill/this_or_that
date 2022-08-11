import { Link, Outlet } from 'react-router-dom'
import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>
          <Link to='/' className={styles.logo}>
            This Or That
          </Link>
        </h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
