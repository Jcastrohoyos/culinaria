import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { getCourses } from '../../api/courses'
import CourseCard from '../../components/ui/CourseCard'
import Button from '../../components/ui/Button'
import styles from './Courses.module.css'

const CATEGORIES = ['Todos', 'Tradicional', 'Internacional', 'Repostería', 'Técnica']

const STATIC_COURSES = [
  { _id: 'c1', title: 'Fundamentos de Panadería Artesanal', description: 'Aprende los secretos del pan artesanal, desde la masa madre hasta el horneado perfecto.', level: 'Principiante', category: 'Técnica', durationWeeks: 4, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80' },
  { _id: 'c2', title: 'Clásicos del Mediterráneo', description: 'Viaja por los sabores del Mediterráneo. Paellas perfectas, risottos cremosos y técnicas de mariscos.', level: 'Intermedio', category: 'Internacional', durationWeeks: 6, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80' },
  { _id: 'c3', title: 'Repostería Fina de Autor', description: 'Técnicas avanzadas de emplatado, chocolatería y texturas para elevar tus postres a nivel profesional.', level: 'Avanzado', category: 'Repostería', durationWeeks: 8, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80' },
  { _id: 'c4', title: 'Maestría en Cortes', description: 'Desarrolla velocidad, precisión y seguridad con el cuchillo. La base fundamental para cualquier cocinero.', level: 'Principiante', category: 'Técnica', durationWeeks: 2, image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80' },
  { _id: 'c5', title: 'Cocina Colombiana Auténtica', description: 'Rescata los sabores ancestrales y técnicas tradicionales de las regiones gastronómicas de Colombia.', level: 'Intermedio', category: 'Tradicional', durationWeeks: 5, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80' },
]

export default function Courses() {
  const [courses, setCourses]       = useState(STATIC_COURSES)
  const [activeCategory, setActive] = useState('Todos')
  const [search, setSearch]         = useState('')
  const gridRef = useRef(null)

  useEffect(() => {
    getCourses()
      .then(res => { if (res.data.courses?.length) setCourses(res.data.courses) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    gsap.fromTo(
      gridRef.current?.children ?? [],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' }
    )
  }, [activeCategory, search])

  const filtered = courses.filter(c => {
    const matchCat   = activeCategory === 'Todos' || c.category === activeCategory
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.header}>
            <h1 className={styles.title}>Explora Cursos</h1>
            <p className={styles.subtitle}>Domina nuevas habilidades culinarias con nuestros chefs expertos.</p>
          </div>
          <div className={styles.searchWrap}>
            <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar cursos…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.chipsScroll}>
          <div className={styles.chips}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.chip} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {filtered.map(c => <CourseCard key={c._id} course={c} />)}

          {filtered.length === 0 && (
            <p className={styles.empty}>No se encontraron cursos con esos filtros.</p>
          )}

          {/* Suggest card */}
          <div className={styles.suggestCard}>
            <span className={`material-symbols-outlined ${styles.suggestIcon}`}>auto_awesome</span>
            <h3 className={styles.suggestTitle}>¿No sabes por dónde empezar?</h3>
            <p className={styles.suggestDesc}>
              Toma nuestro test de 2 minutos para encontrar el curso perfecto.
            </p>
            <Button variant="ghost" size="sm">Hacer Test</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
