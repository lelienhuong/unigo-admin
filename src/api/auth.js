import axios from 'axios'
import store from '@/store'
import dev from '@/utils/dev'
import { Message } from 'element-ui'
import router from '@/router'
import { delay } from '@/utils'

// Create a custom axios instance
export const authApi = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: ''
  }
})

// Add a request interceptor
authApi.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer ' + store?.state?.auth?.data?.accessToken
    dev.log('DevOnly | Authenticated API executed')
    // Must return config
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
authApi.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  async(error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.data.message === 'Token expired') {
      localStorage.removeItem('auth')
      router.push({ name: 'login' })
    }
    if (typeof error.response.data.message === 'string') {
      Message.error(error.response.data.message)
    } else if (typeof error.response.data.message === 'object' && error.response.data.message.length > 0) {
      for (const item of error.response.data.message) {
        Message.error(item)
        await delay(300)
      }
    } else {
      Message.error('An error has occured!')
    }
    return Promise.reject(error)
  }
)

export default {
  install(Vue) {
    // Inject to context as $authApi
    Vue.prototype.$authApi = authApi
  }
}
