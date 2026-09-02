import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.css'

const TOP_NAV = [
  { to: '/',           label: 'Inicio' },
  { to: '/cursos',     label: 'Cursos' },
  { to: '/recetas',    label: 'Recetas' },
  { to: '/comunidad',  label: 'Comunidad' },
]

export default function Header({ onMenuToggle }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      {/* Hamburger — mobile only */}
      <button
        className={styles.menuBtn}
        onClick={onMenuToggle}
        aria-label="Abrir menú"
        aria-expanded="false"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Logo móvil — centrado entre hamburger y acciones */}
      <div className={styles.mobileBrand}>
        <span className={`material-symbols-outlined ${styles.mobileBrandIcon}`}>
          local_dining
        </span>
        Culinaria
      </div>

      {/* Desktop nav */}
      <nav className={styles.nav} aria-label="Navegación principal">
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

      {/* Acciones */}
      <div className={styles.actions}>
        <button className={`${styles.iconBtn} ${styles.searchBtn}`} aria-label="Buscar">
          <span className="material-symbols-outlined">search</span>
        </button>
        <button className={`${styles.iconBtn} ${styles.notifBtn}`} aria-label="Notificaciones">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        {user ? (
          <div className={styles.avatar} onClick={() => navigate('/progreso')}>
            {user.avatar
              ? <img src={user.avatar} alt={user.name} />
              : <div className={styles.avatarPlaceholder}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
            }
          </div>
        ) : (
          <NavLink to="/auth/login" className={styles.navLink}>
            Ingresar
          </NavLink>
        )}
      </div>
    </header>
  )
}
