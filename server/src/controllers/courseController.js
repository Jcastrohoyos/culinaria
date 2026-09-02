import Course from '../models/Course.js'

export async function getCourses(req, res) {
  try {
    const { category, level, limit = 10, page = 1, q } = req.query
    const filter = { published: true }
    if (category) filter.category = category
    if (level)    filter.level    = level
    if (q)        filter.$text    = { $search: q }

    const skip    = (Number(page) - 1) * Number(limit)
    const courses = await Course.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 })
    const total   = await Course.countDocuments(filter)

    res.json({ courses, total, page: Number(page), limit: Number(limit) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getCourse(req, res) {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ message: 'Curso no encontrado.' })
    res.json({ course })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function enrollCourse(req, res) {
  try {
    const user   = req.user
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ message: 'Curso no encontrado.' })

    const alreadyEnrolled = user.enrollments.some(e => e.course.toString() === req.params.id)
    if (alreadyEnrolled)
      return res.status(409).json({ message: 'Ya estás inscrito en este curso.' })

    user.enrollments.push({ course: course._id })
    course.enrolledCount += 1
    await Promise.all([user.save(), course.save()])

    res.json({ message: 'Inscripción exitosa.', enrollments: user.enrollments })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function updateProgress(req, res) {
  try {
    const { lessonId } = req.body
    const user = req.user
    const enrollment = user.enrollments.find(e => e.course.toString() === req.params.id)
    if (!enrollment) return res.status(404).json({ message: 'No estás inscrito en este curso.' })

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId)
    }

    const course       = await Course.findById(req.params.id)
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    enrollment.progress = totalLessons
      ? Math.round((enrollment.completedLessons.length / totalLessons) * 100)
      : 0

    await user.save()
    res.json({ enrollment })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
