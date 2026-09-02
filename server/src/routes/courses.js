import { Router } from 'express'
import {
  getCourses,
  getCourse,
  enrollCourse,
  updateProgress,
} from '../controllers/courseController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.get('/',           getCourses)
router.get('/:id',        getCourse)
router.post('/:id/enroll',    protect, enrollCourse)
router.patch('/:id/progress', protect, updateProgress)

export default router
