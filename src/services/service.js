import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const serviceService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('services', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('services', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('services?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`services/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`services`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`services/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/services',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`services/id`)
}
