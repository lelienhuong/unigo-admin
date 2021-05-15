import axios from 'axios'
import dev from '@/utils/dev'
import { Message } from 'element-ui'

// Create a custom axios instance
export const clientApi = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: ''
  }
})

// Add a request interceptor
clientApi.interceptors.request.use(
  (config) => {
    dev.log('DevOnly | Client API executed')
    // Must return config
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
clientApi.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Message.error(error.response.data.message)
    return Promise.reject(error)
  }
)

export default {
  install(Vue) {
    // Inject to context as $clientApi
    Vue.prototype.$clientApi = clientApi
  }
}
