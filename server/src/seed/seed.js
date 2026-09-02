import 'dotenv/config'
import mongoose from 'mongoose'
import Course from '../models/Course.js'
import Recipe from '../models/Recipe.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/culinaria'

const courses = [
  {
    title: 'Cocina Colombiana Auténtica',
    description: 'Rescata los sabores ancestrales y técnicas tradicionales de las regiones gastronómicas de Colombia.',
    level: 'Intermedio',
    category: 'Tradicional',
    durationWeeks: 5,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    instructor: 'Chef María Rodríguez',
  },
  {
    title: 'Fundamentos de Panadería Artesanal',
    description: 'Aprende los secretos del pan artesanal, desde la masa madre hasta el horneado perfecto, en tu propia cocina.',
    level: 'Principiante',
    category: 'Técnica',
    durationWeeks: 4,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    instructor: 'Chef Pablo Torres',
  },
  {
    title: 'Clásicos del Mediterráneo',
    description: 'Viaja por los sabores del Mediterráneo. Paellas perfectas, risottos cremosos y técnicas de mariscos.',
    level: 'Intermedio',
    category: 'Internacional',
    durationWeeks: 6,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80',
    instructor: 'Chef Sofía Vargas',
  },
  {
    title: 'Repostería Fina de Autor',
    description: 'Técnicas avanzadas de emplatado, chocolatería y texturas para elevar tus postres.',
    level: 'Avanzado',
    category: 'Repostería',
    durationWeeks: 8,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    instructor: 'Chef Ana López',
  },
  {
    title: 'Maestría en Cortes de Cuchillo',
    description: 'Desarrolla velocidad, precisión y seguridad con el cuchillo. La base fundamental.',
    level: 'Principiante',
    category: 'Técnica',
    durationWeeks: 2,
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80',
    instructor: 'Chef Carlos Herrera',
  },
]

const recipes = [
  {
    title: 'Ajiaco Santafereño',
    description: 'Una sopa reconfortante de pollo y tres variedades de papa, oriunda de Bogotá.',
    category: 'Cocina Colombiana Tradicional',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    totalTime: '1h 30 min',
    difficulty: 'Intermedio',
    servings: '4 porciones',
    ingredientGroups: [
      { label: 'Lo Esencial', items: ['3 tazas de papa sabanera', '3 tazas de papa pastusa', '3 tazas de papa criolla', '1 manojo de guascas', '2 mazorcas de maíz'] },
      { label: 'Las Carnes', items: ['2 pechugas de pollo con hueso', '1 cebolla grande partida', '2 dientes de ajo'] },
      { label: 'Los Acompañantes', items: ['Crema de leche', 'Alcaparras', 'Aguacate en tajadas'] },
    ],
    steps: [
      { title: 'Preparar el Caldo Base', desc: 'En olla grande, coloca las pechugas, cebolla, ajo y sal. Cubre con 8 tazas de agua y lleva a hervor. Cocina 35–40 minutos.', image: 'https://images.unsplash.com/photo-1547592577-7d5e97ef3c52?w=800&q=80', order: 1 },
      { title: 'La Alquimia de las Papas', desc: 'Retira el pollo y desméchalo. Agrega las papas al caldo y cocina 20 minutos. Añade la papa criolla entera.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80', order: 2 },
      { title: 'Espesar y Servir', desc: 'Deja que la papa criolla se disuelva y espese el caldo. Incorpora las guascas, el pollo desmechado y sirve con crema y alcaparras.', image: 'https://images.unsplash.com/photo-1547592577-7d5e97ef3c52?w=800&q=80', order: 3 },
    ],
  },
  {
    title: 'Bandeja Paisa',
    description: 'El plato más completo y representativo de la región antioqueña de Colombia.',
    category: 'Cocina Colombiana Tradicional',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    totalTime: '2h',
    difficulty: 'Intermedio',
    servings: '2 porciones',
    ingredientGroups: [
      { label: 'Proteínas', items: ['200g de chicharrón', '150g de carne molida', '1 chorizo antioqueño', '2 huevos fritos'] },
      { label: 'Acompañantes', items: ['1 taza de frijoles rojos', 'Arroz blanco', '1 plátano maduro', '1 aguacate', 'Arepa blanca'] },
    ],
    steps: [
      { title: 'Cocinar los Frijoles', desc: 'Remoja los frijoles desde la noche anterior. Cocina en olla a presión con hogao, costilla y sal por 40 minutos.', order: 1 },
      { title: 'Preparar las Carnes', desc: 'Fríe el chicharrón hasta dorar. Sofríe la carne molida con hogao. Asa el chorizo.', order: 2 },
      { title: 'Montar la Bandeja', desc: 'Sirve todo en un plato grande: frijoles, arroz, plátano frito, chicharrón, carne, chorizo, huevo y aguacate.', order: 3 },
    ],
  },
]

async function seed() {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB')

  await Course.deleteMany({})
  await Recipe.deleteMany({})

  await Course.insertMany(courses)
  await Recipe.insertMany(recipes)

  console.log(`✓ Seeded ${courses.length} courses and ${recipes.length} recipes`)
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed error:', err)
  process.exit(1)
})
