import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const categoryService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('categories', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('categories', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('categories?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`categories/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`categories`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`categories/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/categories',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`categories/${id}`)
}
