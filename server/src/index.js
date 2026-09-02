import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'

import authRoutes    from './routes/auth.js'
import courseRoutes  from './routes/courses.js'
import recipeRoutes  from './routes/recipes.js'
import userRoutes    from './routes/users.js'

const app  = express()
const PORT = process.env.PORT || 4000

// ── Middleware ──────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))

// ── Routes ──────────────────────────────────────
app.use('/api/auth',    authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/recipes', recipeRoutes)
app.use('/api/users',   userRoutes)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }))

// 404 handler
app.use((_req, res) => res.status(404).json({ message: 'Ruta no encontrada.' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor.' })
})

// ── Start ────────────────────────────────────────
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✓ Server running → http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('✗ DB connection failed:', err.message)
    process.exit(1)
  })
