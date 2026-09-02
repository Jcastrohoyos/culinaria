import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

export async function register(req, res) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Todos los campos son requeridos.' })

    const exists = await User.findOne({ email })
    if (exists)
      return res.status(409).json({ message: 'Ya existe una cuenta con ese correo.' })

    const user  = await User.create({ name, email, password })
    const token = signToken(user._id)

    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, favorites: [] },
    })
  } catch (err) {
    res.status(500).json({ message: 'Error interno del servidor.', error: err.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Correo y contraseña requeridos.' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Correo o contraseña incorrectos.' })

    const token = signToken(user._id)
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, favorites: user.favorites },
    })
  } catch (err) {
    res.status(500).json({ message: 'Error interno del servidor.', error: err.message })
  }
}

export async function getMe(req, res) {
  const user = req.user
  res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role, favorites: user.favorites } })
}
