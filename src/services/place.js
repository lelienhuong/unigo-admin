import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const placeService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('api/places', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('api/places', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
     authApi.get('api/places?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`api/places/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`api/places`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`api/places/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: 'api/places',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`api/places/${id}`)
}
