import Cookies from 'js-cookie'

export function getCookie(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setCookie(TokenKey, token) {
  return Cookies.set(TokenKey, token)
}

export function removeCookie(TokenKey) {
  return Cookies.remove(TokenKey)
}

export function getLocalStorage(TokenKey) {
  return localStorage.getItem(TokenKey)
}

export function setLocalStorage(TokenKey, token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeLocalStorage(TokenKey) {
  return localStorage.removeItem(TokenKey)
}