import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const badgeService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('badges', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('badges', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('badges?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`badges/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`badges`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`badges/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/badges',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`badges/id`)
}
