let TYPE = process.env.APP_API

// Use different addresses according to different environments
let config = {
  'TEST': '',
  'PRO': '',
}
let jsonconfig = {
  'TEST': '',
  'PRO': '',
}
let imgconfig = {
  'TEST': '',
  'PRO': '',
}
let apiBaseUrl = config[TYPE]
let jsonBaseUrl = jsonconfig[TYPE]
let imgBaseUrl = imgconfig[TYPE]
export default {
  "apiBaseUrl": apiBaseUrl,
  "jsonBaseUrl": jsonBaseUrl,
  "imgBaseUrl": imgBaseUrl,
}