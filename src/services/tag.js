import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const tagService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('tags', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('tags', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('tags?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`tags/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`tags`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`tags/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/tags',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`tags/${id}`)
}
