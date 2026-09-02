import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getCourses } from '../../api/courses'
import CourseCard from '../../components/ui/CourseCard'
import Button from '../../components/ui/Button'
import styles from './Home.module.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    type: 'img',
    wide: true,
    bg: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80',
    icon: 'restaurant_menu',
    title: '100% Práctico',
    desc: 'Manos a la obra desde el minuto uno. Sin teoría innecesaria.',
  },
  {
    type: 'solid',
    icon: 'visibility',
    title: 'Visualmente Impecable',
    desc: 'Fotografía paso a paso en alta resolución para que nunca te pierdas un detalle.',
  },
  {
    type: 'solid',
    icon: 'local_florist',
    title: 'Ingredientes Locales',
    desc: 'Celebramos la despensa colombiana con técnicas globales.',
  },
  {
    type: 'img',
    wide: true,
    bg: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=80',
    icon: 'group',
    title: 'Comunidad',
    desc: 'Comparte tus resultados y celebra tus triunfos culinarios.',
  },
]

export default function Home() {
  const [courses, setCourses] = useState([])
  const heroRef     = useRef(null)
  const sectionsRef = useRef([])

  useEffect(() => {
    getCourses({ limit: 3 })
      .then(res => setCourses(res.data.courses || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    // Hero entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.heroAnimate',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )

      // Section reveals
      gsap.utils.toArray('.revealSection').forEach(el => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        )
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={`${styles.heroLabel} heroAnimate`}>
            Escuela de cocina · Bogotá
          </span>
          <h1 className={`${styles.heroTitle} heroAnimate`}>
            Aprende el arte de la{' '}
            <span className={styles.heroAccent}>cocina desde cero</span>
          </h1>
          <p className={`${styles.heroDesc} heroAnimate`}>
            Domina las técnicas culinarias con ingredientes frescos y locales. Una experiencia
            de aprendizaje diseñada para elevar tu pasión por la gastronomía colombiana y
            mundial, paso a paso en tu propia cocina.
          </p>
          <div className={`${styles.heroCta} heroAnimate`}>
            <Button to="/cursos" size="lg">Explorar Cursos</Button>
            <Button to="/cursos" variant="ghost" size="lg">Ver Metodología</Button>
          </div>
        </div>
      </section>

      {/* ── Features Bento ── */}
      <section className={`${styles.section} revealSection`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Por qué Culinaria</span>
            <h2 className={styles.sectionTitle}>Una nueva forma de aprender</h2>
          </div>

          <div className={styles.bento}>
            {FEATURES.map((f, i) => (
              f.type === 'img' ? (
                <div
                  key={i}
                  className={`${styles.bentoCard} ${f.wide ? styles.bentoWide : ''}`}
                >
                  <div className={styles.bentoImg} style={{ backgroundImage: `url('${f.bg}')` }} />
                  <div className={styles.bentoGrad} />
                  <div className={styles.bentoText}>
                    <div className={styles.bentoIcon}>
                      <span className="material-symbols-outlined">{f.icon}</span>
                    </div>
                    <h3 className={styles.bentoCardTitle}>{f.title}</h3>
                    <p className={styles.bentoCardDesc}>{f.desc}</p>
                  </div>
                </div>
              ) : (
                <div key={i} className={`${styles.bentoCard} ${styles.bentoSolid}`}>
                  <div className={styles.bentoSolidIcon}>
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <h3 className={styles.bentoSolidTitle}>{f.title}</h3>
                  <p className={styles.bentoSolidDesc}>{f.desc}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className={`${styles.sectionBg} revealSection`}>
        <div className="container" style={{ padding: 'var(--sp-lg) var(--sp-page-x)' }}>
          <div className={styles.sectionRow}>
            <div>
              <span className={styles.sectionLabel}>Aprende Haciendo</span>
              <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Cursos Destacados</h2>
            </div>
            <Link to="/cursos" className={styles.viewAll}>
              Ver todos
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className={styles.grid3}>
              {courses.map(c => <CourseCard key={c._id} course={c} />)}
            </div>
          ) : (
            /* Placeholder cards while backend isn't connected */
            <div className={styles.grid3}>
              {PLACEHOLDER_COURSES.map(c => <CourseCard key={c._id} course={c} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className={`${styles.section} revealSection`}>
        <div className="container">
          <div className={styles.testimonial}>
            <span className={styles.testimonialQuote}>"</span>
            <div className={styles.testimonialAvatar}>
              <img
                src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80"
                alt="Marta Lucía Gómez"
              />
            </div>
            <div className={styles.testimonialBody}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>star</span>
                ))}
              </div>
              <p className={styles.testimonialText}>
                "Nunca pensé que podría hacer una empanada que supiera a las de mi abuela.
                Las fotos paso a paso son tan claras que es imposible perderse.
                Culinaria me devolvió la confianza en la cocina."
              </p>
              <p className={styles.testimonialName}>Marta Lucía Gómez</p>
              <p className={styles.testimonialRole}>Estudiante — Cocina Tradicional</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Static placeholders shown before API connects
const PLACEHOLDER_COURSES = [
  {
    _id: 'p1',
    title: 'Cocina Tradicional Colombiana',
    description: 'Descubre los secretos de las abuelas para preparar los platos más emblemáticos de nuestra tierra.',
    level: 'Principiante',
    category: 'Tradicional',
    durationWeeks: 12,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  },
  {
    _id: 'p2',
    title: 'Pastelería Básica',
    description: 'Domina las masas fundamentales, cremas y técnicas de decoración para postres de nivel profesional.',
    level: 'Intermedio',
    category: 'Repostería',
    durationWeeks: 8,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    _id: 'p3',
    title: 'Maestría en Cortes de Cuchillo',
    description: 'La base de toda buena cocina. Aprende julianas, brunoise, chiffonade y más.',
    level: 'Fundamental',
    category: 'Técnica',
    durationWeeks: 4,
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80',
  },
]
