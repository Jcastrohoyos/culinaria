# Culinaria — Escuela de Cocina en Bogotá

Aplicación web fullstack para aprender cocina colombiana y del mundo.  
**React + CSS Modules + GSAP** en el frontend · **Node.js + Express + MongoDB** en el backend.

---

## Estructura del proyecto

```
tangarife/
├── client/          # Frontend (Vite + React)
│   ├── src/
│   │   ├── api/           # Axios wrappers
│   │   ├── components/
│   │   │   ├── Layout/    # Sidebar, Header, Footer, Layout
│   │   │   └── ui/        # Button, CourseCard, RecipeCard
│   │   ├── context/       # AuthContext
│   │   ├── pages/
│   │   │   ├── Auth/      # Login, Register
│   │   │   ├── Home/      # Landing page
│   │   │   ├── Courses/   # Catálogo de cursos
│   │   │   ├── Recipe/    # Recetas + detalle
│   │   │   └── Progress/  # Panel de progreso
│   │   └── styles/        # tokens.css + global.css
│   └── index.html
└── server/          # Backend (Express + MongoDB)
    └── src/
        ├── config/        # Conexión MongoDB
        ├── controllers/   # auth, courses, recipes, users
        ├── middleware/     # JWT protect
        ├── models/        # User, Course, Recipe
        ├── routes/        # auth, courses, recipes, users
        └── seed/          # seed.js
```

---

## Requisitos previos

- Node.js ≥ 18
- MongoDB (local o Atlas)
- npm

---

## Instalación y ejecución

### 1. Clonar e instalar dependencias

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 2. Configurar variables de entorno del servidor

```bash
cd server
copy .env.example .env
# Edita .env con tu MONGO_URI y JWT_SECRET
```

### 3. Poblar la base de datos (opcional)

```bash
cd server
npm run seed
```

### 4. Levantar el backend

```bash
cd server
npm run dev        # Escucha en http://localhost:4000
```

### 5. Levantar el frontend

```bash
cd client
npm run dev        # Abre http://localhost:5173
```

---

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/auth/me` | Usuario autenticado |
| GET | `/api/courses` | Listado de cursos |
| GET | `/api/courses/:id` | Detalle de un curso |
| POST | `/api/courses/:id/enroll` | Inscribirse (auth) |
| PATCH | `/api/courses/:id/progress` | Actualizar progreso (auth) |
| GET | `/api/recipes` | Listado de recetas |
| GET | `/api/recipes/:id` | Detalle de receta |
| PATCH | `/api/users/favorites/:recipeId` | Toggle favorito (auth) |
| GET | `/api/users/profile` | Perfil completo (auth) |

---

## Paleta de colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--clr-primary` | `#8c4e37` | Terracota — acciones primarias |
| `--clr-secondary` | `#56642b` | Sage — éxito, etiquetas |
| `--clr-surface-low` | `#fbf2ed` | Fondo de tarjetas |
| `--clr-bg` | `#fff8f5` | Fondo base |

---

## Tipografía

- **Headlines:** Libre Caslon Text (serif) — evoca recetarios de herencia
- **Body & Labels:** Work Sans (sans-serif) — alta legibilidad

---

## SEO local

- Meta tags con geo.region CO-DC y geo.placename Bogotá
- Structured data `CookingClass` en JSON-LD
- Títulos y descripciones optimizados para búsquedas locales en Bogotá
