import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import styles from './Auth.module.css'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const { login } = useAuth()
  const navigate  = useNavigate()
  const cardRef   = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Correo o contraseña incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card} ref={cardRef}>
        <div className={styles.brand}>
          <span className={`material-symbols-outlined ${styles.brandIcon}`}>local_dining</span>
          <span className={styles.brandName}>Culinaria</span>
        </div>

        <h1 className={styles.heading}>Bienvenido de nuevo</h1>
        <p className={styles.sub}>Continúa tu viaje culinario.</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPw(p => !p)}
                aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <span className="material-symbols-outlined">
                  {showPw ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Ingresando…' : 'Iniciar Sesión'}
          </Button>
        </form>

        <p className={styles.footer}>
          ¿No tienes cuenta?{' '}
          <Link to="/auth/registro">Crear cuenta</Link>
        </p>
      </div>
    </div>
  )
}
