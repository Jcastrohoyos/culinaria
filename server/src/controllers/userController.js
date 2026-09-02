import User from '../models/User.js'

export async function toggleFavorite(req, res) {
  try {
    const user     = req.user
    const recipeId = req.params.recipeId
    const idx      = user.favorites.indexOf(recipeId)

    if (idx === -1) {
      user.favorites.push(recipeId)
    } else {
      user.favorites.splice(idx, 1)
    }

    await user.save()
    res.json({ user: { _id: user._id, name: user.name, email: user.email, favorites: user.favorites } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getProfile(req, res) {
  const user = req.user
  res.json({ user: { _id: user._id, name: user.name, email: user.email, favorites: user.favorites, enrollments: user.enrollments } })
}
