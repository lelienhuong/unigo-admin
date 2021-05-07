import qs from 'qs'
import { authApi } from '@/api/auth'
import { clientApi } from '@/api/client'
import store from '@/store'

export const userService = {
  /**
   * Create multiple records
   */
  createMany: (form) => clientApi.post('users', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => clientApi.post('users', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('users?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => clientApi.get(`users/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => clientApi.put(`users`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => clientApi.put(`users/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    clientApi.request({
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
  deleteOne: (id) => clientApi.delete(`users/${id}`)
}
