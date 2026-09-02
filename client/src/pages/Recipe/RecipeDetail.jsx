import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { getRecipe } from '../../api/recipes'
import { useAuth } from '../../context/AuthContext'
import styles from './Recipe.module.css'

// Static Ajiaco data (shown when no backend or id === 'ajiaco')
const AJIACO = {
  _id: 'ajiaco',
  title: 'Ajiaco Santafereño',
  category: 'Cocina Colombiana Tradicional',
  description: 'Una sopa reconfortante y profundamente sabrosa de pollo y papa oriunda de Bogotá. El secreto está en el aroma herbal único de las guascas y la armonía de tres variedades de papa.',
  image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1400&q=85',
  totalTime: '1h 30 min',
  difficulty: 'Intermedio',
  servings: '4 porciones',
  ingredientGroups: [
    {
      label: 'Lo Esencial',
      items: ['3 tazas de papa sabanera, pelada y en rodajas','3 tazas de papa pastusa, pelada y en rodajas','3 tazas de papa criolla, lavada y entera','1 manojo de guascas frescas','2 mazorcas de maíz, en trozos'],
    },
    {
      label: 'Las Carnes',
      items: ['2 pechugas grandes de pollo, con hueso','1 cebolla grande, partida a la mitad','2 dientes de ajo, aplastados'],
    },
    {
      label: 'Los Acompañantes',
      items: ['Crema de leche al gusto','Alcaparras','Aguacate en tajadas'],
    },
  ],
  steps: [
    {
      title: 'Preparar el Caldo Base',
      desc: 'En una olla grande, coloca las pechugas, la cebolla partida, el ajo aplastado y sal. Cubre con agua (unas 8 tazas) y lleva a hervor a fuego medio-alto. Baja el fuego y cocina a fuego lento hasta que el pollo esté completamente tierno, unos 35–40 minutos.',
      image: 'https://images.unsplash.com/photo-1547592577-7d5e97ef3c52?w=800&q=80',
    },
    {
      title: 'La Alquimia de las Papas',
      desc: 'Retira el pollo y desméchalo cuando esté frío. Desecha la cebolla y el ajo del caldo. Regresa el caldo a hervor suave y agrega los trozos de mazorca junto con la papa sabanera y pastusa en rodajas. Cocina 20 minutos hasta que comiencen a ablandarse. Luego añade la papa criolla entera.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    },
    {
      title: 'Espesar y Servir',
      desc: 'Continúa la cocción sin tapa a fuego medio. La papa criolla se deshará y espesará el caldo de forma natural. Unos 10 minutos antes de servir, incorpora las guascas frescas. Sirve caliente con el pollo desmechado en los tazones individuales. Remata con una espiral de crema de leche, una cucharada de alcaparras y aguacate al lado.',
      image: 'https://images.unsplash.com/photo-1547592577-7d5e97ef3c52?w=800&q=80',
    },
  ],
}

export default function RecipeDetail() {
  const { id }                  = useParams()
  const [recipe, setRecipe]     = useState(null)
  const [checked, setChecked]   = useState({})
  const { user, toggleFavorite } = useAuth()
  const heroRef = useRef(null)

  useEffect(() => {
    if (!id || id === 'ajiaco') { setRecipe(AJIACO); return }
    getRecipe(id)
      .then(res => setRecipe(res.data.recipe))
      .catch(() => setRecipe(AJIACO))
  }, [id])

  useEffect(() => {
    if (!recipe) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.recipeAnimate',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: 'power3.out' }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [recipe])

  const toggleCheck = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }))

  if (!recipe) return <div style={{ padding: 'var(--sp-lg)', textAlign: 'center' }}>Cargando…</div>

  const isFav = user?.favorites?.includes(recipe._id)

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: `url('${recipe.image}')` }} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <div className={`${styles.heroText} recipeAnimate`}>
            <span className={styles.tag}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>restaurant</span>
              {recipe.category}
            </span>
            <h1 className={styles.heroTitle}>{recipe.title}</h1>
            <p className={styles.heroDesc}>{recipe.description}</p>
          </div>
          <div className={`${styles.heroActions} recipeAnimate`}>
            {user && (
              <button
                className={`${styles.roundBtn} ${styles.roundBtnPrimary}`}
                onClick={() => toggleFavorite(recipe._id)}
                aria-label="Agregar a favoritos"
              >
                <span className="material-symbols-outlined"
                  style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}>
                  favorite
                </span>
              </button>
            )}
            <button
              className={`${styles.roundBtn} ${styles.roundBtnGhost}`}
              onClick={() => window.print()}
              aria-label="Imprimir receta"
            >
              <span className="material-symbols-outlined">print</span>
            </button>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <div className={styles.metaBar}>
        <div className={`container ${styles.metaInner}`}>
          <div className={styles.metaItem}>
            <span className={`material-symbols-outlined ${styles.metaIcon}`}>schedule</span>
            <div>
              <p className={styles.metaLabel}>Tiempo total</p>
              <p className={styles.metaValue}>{recipe.totalTime}</p>
            </div>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={`material-symbols-outlined ${styles.metaIcon}`}>signal_cellular_alt</span>
            <div>
              <p className={styles.metaLabel}>Dificultad</p>
              <p className={styles.metaValue}>{recipe.difficulty}</p>
            </div>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={`material-symbols-outlined ${styles.metaIcon}`}>group</span>
            <div>
              <p className={styles.metaLabel}>Porciones</p>
              <p className={styles.metaValue}>{recipe.servings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        <div className={styles.contentGrid}>
          {/* Left — Ingredients */}
          <aside>
            <div className={styles.ingredientsCard}>
              <h2 className={styles.ingredientsTitle}>Ingredientes</h2>
              {recipe.ingredientGroups?.map((group, gi) => (
                <div key={gi}>
                  <h3 className={styles.categoryTitle}>{group.label}</h3>
                  <ul className={styles.ingredientList}>
                    {group.items.map((item, ii) => {
                      const key = `${gi}-${ii}`
                      return (
                        <li key={key} className={styles.ingredient} onClick={() => toggleCheck(key)}>
                          <input
                            type="checkbox"
                            checked={!!checked[key]}
                            onChange={() => toggleCheck(key)}
                            aria-label={item}
                          />
                          <span
                            className={styles.ingredientLabel}
                            style={{ textDecoration: checked[key] ? 'line-through' : 'none', opacity: checked[key] ? 0.5 : 1 }}
                          >
                            {item}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipHead}>
                <div className={styles.tipAvatar}>
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&q=80"
                    alt="Chef"
                  />
                </div>
                <div>
                  <p className={styles.tipName}>Tips del Chef</p>
                  <p className={styles.tipRole}>Chef María</p>
                </div>
              </div>
              <p className={styles.tipText}>
                "La magia del ajiaco ocurre cuando la papa criolla se disuelve por completo.
                Eso es lo que le da su textura cremosa y su tono dorado inconfundible.
                No aceleres el proceso — deja que hierva suave hasta que las papas se deshagan."
              </p>
            </div>
          </aside>

          {/* Right — Steps */}
          <section>
            <div className={styles.stepsHeader}>
              <h2 className={styles.stepsTitle}>Preparación</h2>
              <span className={styles.stepsCount}>{recipe.steps?.length} Pasos</span>
            </div>

            <div className={styles.steps}>
              {recipe.steps?.map((step, i) => (
                <div key={i} className={`${styles.step} recipeAnimate`}>
                  <div className={styles.stepIndicator}>
                    <div className={styles.stepNum}>{i + 1}</div>
                    {i < recipe.steps.length - 1 && <div className={styles.stepLine} />}
                  </div>
                  <div className={styles.stepCard}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                    {step.image && (
                      <div className={styles.stepImg}>
                        <img src={step.image} alt={step.title} loading="lazy" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
