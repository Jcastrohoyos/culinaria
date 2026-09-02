import api from './client'

export const getRecipes  = (params) => api.get('/recipes', { params })
export const getRecipe   = (id)     => api.get(`/recipes/${id}`)
