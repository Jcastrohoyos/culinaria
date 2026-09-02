import Recipe from '../models/Recipe.js'

export async function getRecipes(req, res) {
  try {
    const { category, limit = 20, page = 1, q } = req.query
    const filter = { published: true }
    if (category) filter.category = category
    if (q)        filter.$text    = { $search: q }

    const skip    = (Number(page) - 1) * Number(limit)
    const recipes = await Recipe.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 })
    const total   = await Recipe.countDocuments(filter)

    res.json({ recipes, total })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getRecipe(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('course', 'title')
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada.' })
    res.json({ recipe })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
