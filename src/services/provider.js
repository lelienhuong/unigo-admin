import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const providerService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('providers', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('providers', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('providers?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`providers/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`providers`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`providers/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/providers',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`providers/id`)
}
