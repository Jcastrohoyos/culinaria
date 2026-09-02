import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.css'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(prev => !prev)
  const closeSidebar  = () => setSidebarOpen(false)

  return (
    <div className={styles.wrapper}>
      <Sidebar open={sidebarOpen} />

      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.visible : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <div className={styles.main}>
        <Header onMenuToggle={toggleSidebar} />
        <main className={styles.content}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
