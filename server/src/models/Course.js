import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  videoUrl:    { type: String },
  duration:    { type: String },
  order:       { type: Number, required: true },
})

const moduleSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  order:   { type: Number, required: true },
  lessons: [lessonSchema],
})

const courseSchema = new mongoose.Schema({
  title:         { type: String, required: true, trim: true },
  description:   { type: String, required: true },
  level:         { type: String, enum: ['Principiante', 'Fundamental', 'Intermedio', 'Avanzado'], required: true },
  category:      { type: String, required: true },
  durationWeeks: { type: Number, required: true },
  image:         { type: String },
  rating:        { type: Number, default: 0, min: 0, max: 5 },
  modules:       [moduleSchema],
  instructor:    { type: String, default: 'Chef Culinaria' },
  published:     { type: Boolean, default: true },
  enrolledCount: { type: Number, default: 0 },
}, { timestamps: true })

courseSchema.index({ title: 'text', description: 'text' })

export default mongoose.model('Course', courseSchema)
