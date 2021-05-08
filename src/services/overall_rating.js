import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const overallRatingService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('overall_ratings', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('overall_ratings', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('overall_ratings?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`overall_ratings/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`overall_ratings`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`overall_ratings/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/overall_ratings',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`overall_ratings/id`)
}
