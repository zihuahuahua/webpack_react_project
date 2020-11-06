import APIUtils from './apiUtils'

/* POST REQUEST */

export const userLogin = params => {
  return APIUtils.commonPost('/user/mobileLogin.api', params, 'noLoad')
}