import { authApi } from '@/api/auth'
import { clientApi } from '@/api/client'

export const authService = {
  login: (form) => clientApi.post('/auth/login', form),
  loginWithGoogle: (form) => clientApi.post('/auth/login/google', form),
  loginWithFacebook: (form) => clientApi.post('/auth/login/facebook', form),
  //
  signup: (form) => clientApi.post('/auth/signup', form),
  //
  forgotPassword: (form) => clientApi.post('/auth/forgot-password', form),
  changePassword: (form) => clientApi.post('/auth/change-password', form),
  //
  getCurrentUser: () => authApi.get('/auth/me'),
  updateCurrentUser: () => authApi.patch('/auth/me')
}
