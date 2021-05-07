import { getToken } from '@/utils/auth'

export const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

export const state = getDefaultState()
