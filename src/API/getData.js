import APIUtils from './apiUtils'

/* GET REQUEST */

export const getData = () => {
  return APIUtils.jsonGet(`/players/winner.json?${Math.random()}`, `noLoad`)
}
