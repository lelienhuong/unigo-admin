import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const roleService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('roles', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('roles', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('roles?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`roles/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`roles`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`roles/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/roles',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`roles/id`)
}
