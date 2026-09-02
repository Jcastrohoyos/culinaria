import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const enrollmentSchema = new mongoose.Schema({
  course:   { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completedLessons: [String],
  enrolledAt: { type: Date, default: Date.now },
})

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true, minlength: 6, select: false },
  avatar:    { type: String },
  role:      { type: String, enum: ['student', 'admin'], default: 'student' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  enrollments: [enrollmentSchema],
}, { timestamps: true })

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Instance method to check password
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

export default mongoose.model('User', userSchema)
