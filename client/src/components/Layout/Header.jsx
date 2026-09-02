import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.css'

const TOP_NAV = [
  { to: '/',        label: 'Inicio' },
  { to: '/cursos',  label: 'Cursos' },
  { to: '/recetas', label: 'Recetas' },
  { to: '/comunidad', label: 'Comunidad' },
]

export default function Header({ onMenuToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <button
        className={styles.menuBtn}
        onClick={onMenuToggle}
        aria-label="Abrir menú"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <nav className={styles.nav}>
        {TOP_NAV.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Buscar">
          <span className="material-symbols-outlined">search</span>
        </button>
        <button className={styles.iconBtn} aria-label="Notificaciones">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        {user ? (
          <div className={styles.avatar} onClick={() => navigate('/progreso')}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/auth/login"
            className={styles.navLink}
          >
            Ingresar
          </NavLink>
        )}
      </div>
    </header>
  )
}
