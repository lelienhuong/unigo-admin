import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const stairService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('api/stairs', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('api/stairs', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
     authApi.get('api/stairs?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`api/stairs/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`api/stairs`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`api/stairs/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: 'api/stairs',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`api/stairs/${id}`)
}
