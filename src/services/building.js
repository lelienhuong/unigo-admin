import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const buildingService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('api/path/buildings?schoolId=1', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('api/path/buildings', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('api/path/buildings?schoolId=1&' + qs.stringify(query, { arrayFormat: 'repeat' })),

  getAllBuildings: () =>
    authApi.get('api/tools/buildings?schoolId=1'),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`api/path/buildings/${id}`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.patch(`api/path/buildings`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.patch(`api/path/buildings/${id}`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: 'api/path/buildings',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete('api/path/buildings',{ data: {ids:[id]} })
}
