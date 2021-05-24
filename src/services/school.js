import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const schoolService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('api/schools', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('api/schools', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('api/schools?' + qs.stringify(query, { arrayFormat: 'repeat' })),

  getAllPlaces: async () =>
    authApi.get('api/schools/1/places'),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`api/schools/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`api/schools`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`api/schools/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: 'api/schools',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`api/schools`, { data: {ids:[id]} })
}
