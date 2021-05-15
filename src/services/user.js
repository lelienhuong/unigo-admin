import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const userService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('users', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('users', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('users?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`users/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`users`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`users/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/users',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`users/${id}`)
}
