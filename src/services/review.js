import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const reviewService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('reviews', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('reviews', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('reviews?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`reviews/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`reviews`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`reviews/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/reviews',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`reviews/id`)
}
