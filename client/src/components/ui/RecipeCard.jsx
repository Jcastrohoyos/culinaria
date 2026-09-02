import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './RecipeCard.module.css'

export default function RecipeCard({ recipe, onToggleFavorite }) {
  const { user } = useAuth()
  const isFav = user?.favorites?.includes(recipe._id)

  const handleFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onToggleFavorite) onToggleFavorite(recipe._id)
  }

  return (
    <Link to={`/recetas/${recipe._id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80'}
          alt={recipe.title}
          loading="lazy"
        />
      </div>

      {user && (
        <button className={styles.favBtn} onClick={handleFav} aria-label="Favorito">
          <span
            className={`material-symbols-outlined ${styles.favIcon} ${isFav ? styles.favIconActive : styles.favIconInactive}`}
          >
            favorite
          </span>
        </button>
      )}

      <div className={styles.body}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <p className={styles.desc}>{recipe.description}</p>
      </div>
    </Link>
  )
}
