import { useEffect, useState } from 'react'
import { getRecipes } from '../../api/recipes'
import RecipeCard from '../../components/ui/RecipeCard'
import { useAuth } from '../../context/AuthContext'
import styles from './Recipes.module.css'

const STATIC_RECIPES = [
  { _id: 'ajiaco', title: 'Ajiaco Santafereño', description: 'La sopa símbolo de Bogotá: pollo, tres papas y guascas.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80' },
  { _id: 'r2', title: 'Bandeja Paisa', description: 'El plato más representativo de Antioquia. Completo y contundente.', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
  { _id: 'r3', title: 'Empanadas de Pipián', description: 'Masa de maíz rellena con papa y maní. Tradición nariñense.', image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80' },
  { _id: 'r4', title: 'Sancocho de Gallina', description: 'Caldo reconfortante de gallina criolla con tubérculos del campo.', image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=600&q=80' },
  { _id: 'r5', title: 'Changua Bogotana', description: 'Sopa de leche con huevo y cilantro. El desayuno bogotano por excelencia.', image: 'https://images.unsplash.com/photo-1547592577-7d5e97ef3c52?w=600&q=80' },
  { _id: 'r6', title: 'Chocolate Santafereño', description: 'Chocolate espeso servido con queso campesino y pan de bono.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80' },
]

export default function Recipes() {
  const [recipes, setRecipes] = useState(STATIC_RECIPES)
  const { toggleFavorite }    = useAuth()

  useEffect(() => {
    getRecipes()
      .then(res => { if (res.data.recipes?.length) setRecipes(res.data.recipes) })
      .catch(() => {})
  }, [])

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Recetas</h1>
        <p className={styles.subtitle}>
          Explora la riqueza de la gastronomía colombiana y del mundo.
        </p>
        <div className={styles.grid}>
          {recipes.map(r => (
            <RecipeCard key={r._id} recipe={r} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      </div>
    </div>
  )
}
