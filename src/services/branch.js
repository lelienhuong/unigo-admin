import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const branchService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('branches', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('branches', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('branches?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`branches/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`branches`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`branches/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/branches',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`branches/id`)
}
