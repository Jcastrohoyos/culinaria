import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { to: '/',          icon: 'home',      label: 'Inicio' },
  { to: '/cursos',    icon: 'menu_book', label: 'Cursos' },
  { to: '/recetas',   icon: 'restaurant_menu', label: 'Recetas' },
  { to: '/progreso',  icon: 'analytics', label: 'Mi Progreso' },
  { to: '/favoritos', icon: 'favorite',  label: 'Favoritos' },
]

export default function Sidebar({ open }) {
  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <div className={styles.brand}>
        <span className={`material-symbols-outlined ${styles.brandIcon}`}>
          local_dining
        </span>
        <span className={styles.brandName}>Culinaria</span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={`material-symbols-outlined ${styles.icon}`}>
              {icon}
            </span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <p className={styles.version}>© 2024 Culinaria · Bogotá</p>
      </div>
    </aside>
  )
}
