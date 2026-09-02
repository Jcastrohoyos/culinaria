import { Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from './context/AuthContext'

import Layout    from './components/Layout/Layout'
import Home      from './pages/Home/Home'
import Courses   from './pages/Courses/Courses'
import Recipes   from './pages/Recipe/Recipes'
import RecipeDetail from './pages/Recipe/RecipeDetail'
import Progress  from './pages/Progress/Progress'
import Login     from './pages/Auth/Login'
import Register  from './pages/Auth/Register'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/auth/login" replace />
}

export default function App() {
  return (
    <>
      <Helmet>
        {/* Local SEO structured data */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CookingClass',
          name: 'Culinaria',
          description: 'Escuela de cocina en Bogotá. Cursos de gastronomía colombiana y mundial.',
          url: 'https://www.culinaria.com.co',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Calle 85',
            addressLocality: 'Bogotá',
            addressCountry: 'CO',
          },
          telephone: '+57-1-000-0000',
          openingHours: 'Mo-Sa 08:00-21:00',
        })}</script>
      </Helmet>

      <Routes>
        {/* Auth routes — no sidebar/header */}
        <Route path="/auth/login"    element={<Login />} />
        <Route path="/auth/registro" element={<Register />} />

        {/* Main app routes — with Layout */}
        <Route element={<Layout />}>
          <Route path="/"          element={<Home />} />
          <Route path="/cursos"    element={<Courses />} />
          <Route path="/cursos/:id" element={<Courses />} />
          <Route path="/recetas"   element={<Recipes />} />
          <Route path="/recetas/:id" element={<RecipeDetail />} />
          <Route
            path="/progreso"
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Recipes />
              </ProtectedRoute>
            }
          />
          <Route path="/comunidad" element={<Home />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
