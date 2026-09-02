import mongoose from 'mongoose'

const ingredientGroupSchema = new mongoose.Schema({
  label: { type: String, required: true },
  items: [{ type: String }],
})

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc:  { type: String, required: true },
  image: { type: String },
  order: { type: Number, required: true },
})

const recipeSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  image:       { type: String },
  totalTime:   { type: String },
  difficulty:  { type: String, enum: ['Fácil', 'Intermedio', 'Avanzado'], default: 'Intermedio' },
  servings:    { type: String },
  ingredientGroups: [ingredientGroupSchema],
  steps:       [stepSchema],
  course:      { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  author:      { type: String, default: 'Culinaria' },
  published:   { type: Boolean, default: true },
}, { timestamps: true })

recipeSchema.index({ title: 'text', description: 'text' })

export default mongoose.model('Recipe', recipeSchema)
