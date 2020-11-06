export function phoneVerification(num) {
  const reg = /^[5-9]\d{9}$/;
  return reg.test(num)
}
export function passwordVerification(num) {
  const reg = /^[\w.]{6,20}$/;
  return reg.test(num)
}
export function otpVerification(num) {
  const reg = /^\d{4}$/;
  return reg.test(num)
}
export function emailVerification(email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email)
}