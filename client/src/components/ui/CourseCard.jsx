import { Link } from 'react-router-dom'
import styles from './CourseCard.module.css'

export default function CourseCard({ course }) {
  const {
    _id,
    title,
    description,
    level,
    category,
    durationWeeks,
    rating,
    image,
  } = course

  return (
    <Link to={`/cursos/${_id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80'}
          alt={title}
          loading="lazy"
        />
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.badgeLevel}`}>{level}</span>
          {rating && (
            <span className={`${styles.badge} ${styles.badgeRating}`}>
              <span className={`material-symbols-outlined ${styles.badgeStar}`}>star</span>
              {rating}
            </span>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.meta}>
          <span className={styles.duration}>
            <span className={`material-symbols-outlined ${styles.metaIcon}`}>schedule</span>
            {durationWeeks} semanas
          </span>
          <span className={styles.cta}>
            Ver Curso
            <span className={`material-symbols-outlined ${styles.ctaArrow}`}>arrow_forward</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
