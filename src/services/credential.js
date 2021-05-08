import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const credentialService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('credentials', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('credentials', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('credentials?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`credentials/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`credentials`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`credentials/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/credentials',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`credentials/id`)
}
