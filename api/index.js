// Vercel Serverless Function — Express adapter
// Handles all /api/* routes

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

import authRoutes   from '../server/src/routes/auth.js'
import courseRoutes from '../server/src/routes/courses.js'
import recipeRoutes from '../server/src/routes/recipes.js'
import userRoutes   from '../server/src/routes/users.js'

const app = express()

// ── CORS ─────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  'http://localhost:5173',
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))

// ── DB: reuse connection across warm invocations ──
let isConnected = false

async function connectDB() {
  if (isConnected) return
  const uri = process.env.MONGO_URI
  if (!uri) throw new Error('MONGO_URI environment variable is not set')
  await mongoose.connect(uri, { bufferCommands: false })
  isConnected = true
}

// Connect before every request
app.use(async (_req, _res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    next(err)
  }
})

// ── Routes ───────────────────────────────────────
app.use('/api/auth',    authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/users',   userRoutes)

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', env: process.env.NODE_ENV })
)

// 404
app.use((_req, res) => res.status(404).json({ message: 'Ruta no encontrada.' }))

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Error interno.' })
})

// Export for Vercel (handler, not app.listen)
export default app
