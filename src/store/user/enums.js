/**
 * Blog mutation module's enum
 */
export const userMutations = {
  SET: {
    AVATAR: 'user/SET_AVATAR',
    NAME: 'user/SET_NAME',
    TOKEN: 'user/SET_TOKEN'
  },
  RESET_STATE: 'user/RESET_STATE'
}

export const userActions = {
  LOGIN: 'app/login',
  LOGOUT: 'app/logout',
  GET_INFO: 'app/getInfo',
  RESET_TOKEN: 'app/resetToken'
}
