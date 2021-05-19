import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const sectorService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('api/sectors', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('api/sectors', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
     authApi.get('api/sectors?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`api/sectors/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`api/sectors`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`api/sectors/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: 'api/sectors',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`api/sectors/${id}`)
}
