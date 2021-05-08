import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const companyService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('companies', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('companies', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('companies?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`companies/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`companies`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`companies/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/companies',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`companies/id`)
}
