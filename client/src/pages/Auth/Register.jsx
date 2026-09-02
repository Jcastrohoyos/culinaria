import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import styles from './Auth.module.css'

export default function Register() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [terms, setTerms]       = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()
  const cardRef  = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!terms) { setError('Debes aceptar los términos y condiciones.'); return }
    setError(''); setLoading(true)
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la cuenta.')
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

        <h1 className={styles.heading}>Comienza tu viaje culinario</h1>
        <p className={styles.sub}>Descubre recetas, técnicas y sabores extraordinarios.</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              className={styles.input}
              placeholder="Ej. Julia Child"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

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
                autoComplete="new-password"
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

          <div className={styles.termsRow}>
            <input
              id="terms"
              type="checkbox"
              className={styles.checkbox}
              checked={terms}
              onChange={e => setTerms(e.target.checked)}
            />
            <label htmlFor="terms" className={styles.termsText}>
              Acepto los <a href="#">términos y condiciones</a> y la{' '}
              <a href="#">política de privacidad</a>.
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Crear Cuenta'}
          </Button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/auth/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}
