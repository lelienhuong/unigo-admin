import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const userService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('api/users', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('api/users', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('api/users?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`api/users/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`api/users`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`api/users/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: 'api/users',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`api/users/${id}`)
}
