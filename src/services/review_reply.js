import qs from 'qs'
import { authApi } from '@/api/auth'
import store from '@/store'

export const reviewReplyService = {
  /**
   * Create multiple records
   */
  createMany: (form) => authApi.post('review_replies', { data: form }),
  /**
    * Create single record
    */
  createOne: (form) => authApi.post('review_replies', form),
  /**
    * Get multiple records
    */
  getMany: (query) =>
    authApi.get('review_replies?' + qs.stringify(query, { arrayFormat: 'repeat' })),
  /**
    * Get single record
    */
  getOne: (id) => authApi.get(`review_replies/id`),
  /**
    * Update multiple records
    */
  updateMany: (form) => authApi.put(`review_replies`, { data: form }),
  /**
    * Update single record
    */
  updateOne: (id, form) => authApi.put(`review_replies/id`, form),
  /**
    * Delete multiple records
    */
  deleteMany: (ids) =>
    authApi.request({
      url: '/review_replies',
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + store.state.auth?.data?.token
      },
      data: ids
    }),
  /**
    * Delete single record
    */
  deleteOne: (id) => authApi.delete(`review_replies/id`)
}
