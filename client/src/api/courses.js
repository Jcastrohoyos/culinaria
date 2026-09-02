import api from './client'

export const getCourses    = (params) => api.get('/courses', { params })
export const getCourse     = (id)     => api.get(`/courses/${id}`)
export const enrollCourse  = (id)     => api.post(`/courses/${id}/enroll`)
export const updateProgress = (id, lessonId) =>
  api.patch(`/courses/${id}/progress`, { lessonId })
