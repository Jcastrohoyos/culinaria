import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button'
import RecipeCard from '../../components/ui/RecipeCard'
import styles from './Progress.module.css'

const ACTIVE_COURSES = [
  { id: 1, title: 'Cocina de Mar Colombiana', level: 'Intermedio', pct: 60, next: 'Preparación de Pargo Rojo' },
  { id: 2, title: 'Masas y Arepas Tradicionales', level: 'Principiante', pct: 15, next: 'Amasado Básico' },
]

const UPCOMING = [
  { month: 'Oct', day: 12, name: 'Masterclass: Ceviche Peruano', meta: 'En vivo · 18:00 COT' },
  { month: 'Oct', day: 15, name: 'Taller de Salsas Madre', meta: 'Módulo 3 · Grabado' },
  { month: 'Nov', day: 3,  name: 'Cocina al Carbón', meta: 'Módulo 1 · Grabado' },
]

const FAV_RECIPES = [
  { _id: 'ajiaco', title: 'Ajiaco Santafereño', description: 'Receta tradicional con guascas, tres tipos de papa y pollo desmechado.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80' },
  { _id: 'r2',     title: 'Lomo al Trapo', description: 'Técnica clásica de cocción en salmuera al fuego directo.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
]

const CERTS = [
  { name: 'Fundamentos Culinarios', date: 'Completado Dic 2023', locked: false },
  { name: 'Cocina de Autor', date: 'En progreso', locked: true },
  { name: 'Pastelería Avanzada', date: 'Bloqueado', locked: true },
  { name: 'Cocina Regional', date: 'Bloqueado', locked: true },
]

export default function Progress() {
  const { user } = useAuth()
  const pageRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pgAnimate',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.page} ref={pageRef}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.pageHeader} pgAnimate`}>
          <div>
            <h1 className={styles.title}>Mi Progreso</h1>
            <p className={styles.subtitle}>Continuemos tu viaje culinario.</p>
          </div>
          <div className={styles.streak}>
            <span className={`material-symbols-outlined ${styles.streakIcon}`}>
              local_fire_department
            </span>
            Racha de 5 días
          </div>
        </div>

        {/* Active Courses */}
        <section className="pgAnimate">
          <h2 className={styles.sectionTitle}>
            <span className={`material-symbols-outlined ${styles.sectionIcon}`}>auto_stories</span>
            Cursos Activos
          </h2>
          <div className={styles.coursesGrid}>
            {ACTIVE_COURSES.map(c => (
              <div key={c.id} className={styles.courseCard}>
                <div className={styles.courseTop}>
                  <div>
                    <span className={styles.levelBadge}>{c.level}</span>
                    <h3 className={styles.courseTitle}>{c.title}</h3>
                  </div>
                  <div className={styles.pct}>{c.pct}%</div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${c.pct}%` }} />
                </div>
                <div className={styles.courseFooter}>
                  <p className={styles.nextLesson}>Próxima: {c.next}</p>
                  <Button size="sm">Continuar</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two-col: upcoming + favorites */}
        <div className={`${styles.twoCol} pgAnimate`}>
          {/* Upcoming classes */}
          <section>
            <h2 className={styles.sectionTitle}>
              <span className={`material-symbols-outlined ${styles.sectionIcon}`}>calendar_month</span>
              Próximas Clases
            </h2>
            <div className={styles.upcomingCard}>
              {UPCOMING.map((cls, i) => (
                <div key={i}>
                  <div className={styles.classItem}>
                    <div className={styles.dateChip}>
                      <span className={styles.dateMonth}>{cls.month}</span>
                      <span className={styles.dateDay}>{cls.day}</span>
                    </div>
                    <div className={styles.classInfo}>
                      <p className={styles.className}>{cls.name}</p>
                      <p className={styles.classMeta}>{cls.meta}</p>
                    </div>
                    <span className="material-symbols-outlined" style={{ color: 'var(--clr-on-surface-variant)' }}>
                      arrow_forward
                    </span>
                  </div>
                  {i < UPCOMING.length - 1 && <div className={styles.divider} />}
                </div>
              ))}
            </div>
          </section>

          {/* Favorites */}
          <section>
            <div className={styles.sectionRow}>
              <h2 className={styles.sectionTitle}>
                <span className={`material-symbols-outlined ${styles.sectionIcon}`}>favorite</span>
                Mis Favoritos
              </h2>
              <Link to="/recetas" className={styles.viewAll}>Ver todos</Link>
            </div>
            <div className={styles.favGrid}>
              {FAV_RECIPES.map(r => <RecipeCard key={r._id} recipe={r} />)}
            </div>
          </section>
        </div>

        {/* Certificates */}
        <section className="pgAnimate">
          <h2 className={styles.sectionTitle}>
            <span className={`material-symbols-outlined ${styles.sectionIcon}`}>workspace_premium</span>
            Mis Certificados
          </h2>
          <div className={styles.certGrid}>
            {CERTS.map((cert, i) => (
              <div
                key={i}
                className={`${styles.certCard} ${cert.locked ? styles.certCardLocked : ''}`}
              >
                <div className={styles.certIcon}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '1.75rem', fontVariationSettings: cert.locked ? "'FILL' 0" : "'FILL' 1" }}
                  >
                    {cert.locked ? 'lock' : 'emoji_events'}
                  </span>
                </div>
                <p className={styles.certName}>{cert.name}</p>
                <p className={styles.certDate}>{cert.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
