import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const categoryService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('api/categories', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('api/categories', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('api/categories?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`api/categories/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`api/categories`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`api/categories/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: 'api/categories',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete('api/categories',{ data: {ids:[id]} })
}
