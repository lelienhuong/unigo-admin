import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const nodeService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('api/nodes', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('api/nodes', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('api/nodes?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`api/nodes/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`api/nodes`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`api/nodes/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: 'api/nodes',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`api/nodes/${id}`)
}
