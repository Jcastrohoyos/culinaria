import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { to: '/',           icon: 'home',            label: 'Inicio' },
  { to: '/cursos',     icon: 'menu_book',        label: 'Cursos' },
  { to: '/recetas',    icon: 'restaurant_menu',  label: 'Recetas' },
  { to: '/comunidad',  icon: 'groups',           label: 'Comunidad' },
  { to: '/progreso',   icon: 'analytics',        label: 'Mi Progreso' },
  { to: '/favoritos',  icon: 'favorite',         label: 'Favoritos' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <div className={styles.brand}>
        <span className={`material-symbols-outlined ${styles.brandIcon}`}>
          local_dining
        </span>
        <span className={styles.brandName}>Culinaria</span>

        {/* Close button — only visible on mobile */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className={styles.nav} aria-label="Navegación principal">
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onClose}            /* cierra al navegar en móvil */
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
